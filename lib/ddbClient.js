"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ddbClient = void 0;
var _clientDynamodb = require("@aws-sdk/client-dynamodb");
// Create service client module using ES6 syntax.

// Create an Amazon DynamoDB service client object.
var ddbClient = new _clientDynamodb.DynamoDBClient({
  region: "ap-northeast-2"
});
exports.ddbClient = ddbClient;
//# sourceMappingURL=ddbClient.js.map