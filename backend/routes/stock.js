var express = require("express");
// var db = require("../db/index.js");

var catchErrors = require("../lib/async-error");
var router = express.Router();
var opendartLib = require("../lib/opendart");
const fnlttSinglAcnt = require("../models/fnlttSinglAcnt");

const models = require("../models/index.js");

models.sequelize
  .sync({})
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

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
    // var result = await opendartLib.fnlttSinglAcnt("00126380", "2018", "11011");
    var findCode = await models.corpCode.findOne({
      raw: true,
      where: {
        corp_code: "00126380",
      },
    });

    var findData = await models.fnlttSinglAcnt.findOne({
      raw: true,
      where: {
        stock_code: findCode.stock_code,
        bsns_year: "2018",
        reprt_code: "11011",
      },
    });

    if (findData) {
      res.send(
        "이미 저장되어있는 데이터 입니다.",
        findCode.stock_name,
        findData.stock_code,
        findData.bsns_year,
        findData.reprt_code
      );
    } else {
      if (result.status == "000") {
        models.fnlttSinglAcnt.create({
          rcept_no: result.list.recept_no,
          bsns_year: result.list.bsns_year,
          stock_code: result.list.stock_code,
          reprt_code: result.list.reprt_code,
          account_nm: result.list.account_nm,
          fs_div: result.list.fs_div,
          fs_nm: result.list.fs_nm,
          sj_div: result.list.sj_div,
          sj_nm: result.list.sj_nm,
          thstrm_nm: result.list.thstrm_nm,
          thstrm_dt: result.list.thstrm_dt,
          thstrm_amount: result.list.thstrm_amount,
          thstrm_add_amount: result.list.thstrm_add_amount,
          frmtrm_nm: result.list.frmtrm_nm,
          frmtrm_dt: result.list.frmtrm_dt,
          frmtrm_amount: result.list.frmtrm_amount,
          frmtrm_add_amount: result.list.frmtrm_add_amount,
          bfefrmtrm_nm: result.list.bfefrmtrm_nm,
          bfefrmtrm_dt: result.list.bfefrmtrm_dt,
          bfefrmtrm_amount: result.list.bfefrmtrm_amount,
          ord: result.list.ord,
        });
      }
    }

    // res.send(findCode);
  })
);

// 고유번호
router.get(
  "/document",
  catchErrors(async (req, res, next) => {})
);

module.exports = router;
