"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var _require = require("./dynamodb"),
  QueryUser = _require.QueryUser;
var PORT_NUMBER = 2022;
app.post('/create-user', function (req, res) {});
app.post('/get-user', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  QueryUser();
  res.json({
    name: "usoock"
  });
});
app.listen(PORT_NUMBER, function () {
  console.log("Express app is running on port " + PORT_NUMBER);
});