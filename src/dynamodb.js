// import { QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { ddbDocClient } from "./ddbDocument";

const PARTITION_KEY = "userKey";
const SORT_KEY = "index";

const tableName = "ice-phoenix-user";

export const QueryUser = async () => {
  const params = {
    Statement: "SELECT * FROM " + tableName + " where index>=?",
    Parameters: [{ N: 0 }],
  };
  try {
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    for (let i = 0; i < data.Items.length; i++) {
      console.log(
        "Success. The query return the following data. Item " + i,
        data.Items[i].year,
        data.Items[i].title,
        data.Items[i].info
      );
    }
    return "Run successfully"; // For unit tests.
  } catch (err) {
    console.error(err);
  }
};