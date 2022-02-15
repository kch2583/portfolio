var express = require("express");
var router = express.Router();
var path = require("path");
// var db = require("../db/index.js");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
module.exports = router;
