"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ddbDocClient = void 0;
var _libDynamodb = require("@aws-sdk/lib-dynamodb");
var _ddbClient = require("./ddbClient");
// Create service client module using ES6 syntax.

var marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false,
  // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false,
  // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false // false, by default.
};

var unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false // false, by default.
};

var translateConfig = {
  marshallOptions: marshallOptions,
  unmarshallOptions: unmarshallOptions
};

// Create the DynamoDB Document client.
var ddbDocClient = _libDynamodb.DynamoDBDocumentClient.from(_ddbClient.ddbClient, translateConfig);
exports.ddbDocClient = ddbDocClient;