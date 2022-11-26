// import { QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { BatchExecuteStatementCommand, ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { ddbDocClient } from "./ddbDocument";

const PARTITION_KEY = "userKey";
const SORT_KEY = "index";

const tableName = "ice-phoenix-user";

export const CheckUser = async (userKey) => {
  const params = {
    Statement: `SELECT "userKey", "index" 
                FROM "${tableName}" 
                WHERE "userKey" = ?
    `,
    Parameters: [{ S: userKey }],
  };
  try {
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    if(data.Items.length > 0)  return false;
    else                       return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
export const AddUser = async (userKey) => {
  const params = {
    Statement: `INSERT INTO "${tableName}"
                VALUE {
                  'userKey' : ?,
                  'level' : ?,
                  'sceneNo' : ?,
                  'clearCount' : ?,
                  'adaptation' : ?
                }
    `,
    Parameters: [
      { S: userKey },
      { N: '1' },
      { N: '0' },
      { N: '0' },
      { L: [{N: '0'}, {N: '0'}, {N: '0'}, {N: '0'}, {N: '0'}] },
    ],
  };
  try {
    await ddbDocClient.send(new ExecuteStatementCommand(params));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const GetData = async (userKey) => {
  const params = {
    Statement: `SELECT "userKey", "level", "sceneNo", "clearCount", "adaptation"
                FROM "${tableName}"
                WHERE "userKey" = ?
    `,
    Parameters: [{ S: userKey }]
  }
  try {
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    if(data.Items.length > 0) {
      let gameData = {
        "userKey" : data.Items[0].userKey.S,
        "level" : data.Items[0].level.N,
        "sceneNo" : data.Items[0].sceneNo.N,
        "clearCount" : data.Items[0].clearCount.N,
        "adaptation" : Array.from(data.Items[0].adaptation.L, elmt => elmt.N),
      };
      return gameData;
    } else {
      console.error("not found user data with 'userKey' that is sended by user.");
      return false;
    }
  } catch(err) {
    console.log("Error In func::GetData");
    console.log(err);
  }
};
export const UpdateData = async (gameData) => {
  const originData = await GetData(gameData.userKey);
  if(originData.level > gameData.level
  || originData.clearCount > gameData.clearCount) {
    console.error("Server got the invaild data. Update process stoped.");
    return false;
  }
  const params = {
    Statements: [{
      Statement: `UPDATE "${tableName}"
                  SET "level"=?, "sceneNo"=?, "clearCount"=?, "adaptation"=?
                  WHERE "userKey"=?
      `,
      Parameters: [
        { N: ''+gameData.level },
        { N: ''+gameData.sceneNo },
        { N: ''+gameData.clearCount },
        { L: Array.from(gameData.adaptation, elmt => { return { N: ''+elmt }; }) },
        { S: gameData.userKey },
      ]
    }]
  };
  try {
    let t = await ddbDocClient.send(new BatchExecuteStatementCommand(params))
    return true;
  } catch(err) {
    console.error(err);
    return false;
  }
}