import express from "express";
import crypto from "crypto";
const app = express();

const { CheckUser, AddUser, GetData, UpdateData } = require("./dynamodb");

const PORT_NUMBER = 2022;

app.use(express.urlencoded({ extended: true }));
app.post('/create-user', async (req, res) => {
    CreateUser(res);
});
app.post('/get-data', async (req, res) => {
    const gameData = await GetData(req.body.userKey);
    // console.log(gameData);
    res.json(gameData);
});
app.post('/sync-data', async (req, res) => {
    const gameData = {
        ...JSON.parse(req.body.dataJson)
    };
    if(await UpdateData(gameData)) {
        res.json({
            result : 200
        });
    } else {
        res.json({
            result : 500
        });
    }
});

async function CreateUser(res) {
    let userKey;
    let tryCount = 0;
    do {
        tryCount ++;
        userKey = crypto.randomBytes(64).toString('base64');
    } while(!await CheckUser(userKey) || tryCount >= 10);
    res.setHeader("Content-Type", "application/json");
    if(await AddUser(userKey)) {
        res.json({
            result : 200,
            userKey : userKey
        });
    } else {
        console.log("Faild to put new user key. So return error-message to client.");
        res.json({
            result : 500,
            message : "서버에서 예외가 발생하였습니다.\n서버 담당자에게 문의해주시길 바랍니다."
        });
    }
}

app.listen(PORT_NUMBER, () => {
    console.log("Express app is running on port " + PORT_NUMBER);
})