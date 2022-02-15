var express = require("express");
var catchErrors = require("../lib/async-error");
var router = express.Router();
var opendartLib = require("../lib/opendart");

// 공시검색
router.get(
  "/list",
  catchErrors(async (req, res, next) => {
    var result = await opendartLib.list(null, "20200117", "20200117");
    // var result = "hihihiihihihi";

    res.send(result);
  })
);

// 단일회사 주요계정
router.get(
  "/fnlttSinglAcnt",
  catchErrors(async (req, res, next) => {
    var result = await opendartLib.fnlttSinglAcnt("00126380", "2018", "11011");
    res.send(result);
  })
);

// 고유번호
router.get(
  "/document",
  catchErrors(async (req, res, next) => {
    var result = await opendartLib.document();
    console.log(result);
    // res.send(result);
  })
);

module.exports = router;
