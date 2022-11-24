import express from "express";
const app = express();

const { QueryUser } = require("./dynamodb");

const PORT_NUMBER = 2022;

app.post('/create-user', (req, res) => {
    
});
app.post('/get-user', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    QueryUser();
    res.json({name : "usoock"});
});

app.listen(PORT_NUMBER, () => {
    console.log("Express app is running on port " + PORT_NUMBER);
})