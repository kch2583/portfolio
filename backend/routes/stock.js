var express = require("express");
// var db = require("../db/index.js");

var catchErrors = require("../lib/async-error");
var router = express.Router();
var opendartLib = require("../lib/opendart");
const fnlttSinglAcnt = require("../models/fnlttSinglAcnt");

const CorpCode = require("../db/corpCode");
const FnlttSinglAcnt = require("../db/fnlttSinglAcnt");

// const models = require("../models/index.js");

// models.sequelize
//   .sync({})
//   .then(() => {
//     console.log(" DB 연결 성공");
//   })
//   .catch((err) => {
//     console.log("연결 실패");
//     console.log(err);
//   });

// 공시검색 mysql
router.get(
  "/list",
  catchErrors(async (req, res, next) => {
    var result = await opendartLib.list(null, "20200117", "20200117");
    // var result = "hihihiihihihi";

    res.send(result);
  })
);

// 단일회사 주요계정
router.post(
  "/fnlttSinglAcnt",
  catchErrors(async (req, res, next) => {
    var findCode = await CorpCode.findOne({ corp_code: req.body.corp_code });

    var result = await opendartLib.fnlttSinglAcnt(
      req.body.corp_code,
      req.body.bsns_year,
      req.body.reprt_code
    );

    var object1 = {};

    for (let index = 0; index < result.list.length; index++) {
      object1[result.list[index].account_nm] = result.list[index].thstrm_amount;
    }

    var findData = await FnlttSinglAcnt.find({
      stock_code: findCode.stock_code,
      bsns_year: req.body.bsns_year,
      reprt_code: req.body.reprt_code,
    });

    if (findData.length >= 1) {
      res.send("이미 저장되어 있는 데이터입니다.");
    } else {
      await FnlttSinglAcnt.create({
        rcept_no: result.list[0].rcept_no,
        bsns_year: result.list[0].bsns_year,
        stock_code: result.list[0].stock_code,
        reprt_code: result.list[0].reprt_code,
        thstrm_nm: result.list[0].thstrm_nm,
        thstrm_dt: result.list[0].thstrm_dt,
        current_asset: object1["유동자산"],
        non_current_asset: object1["비유동자산"],
        total_assets: object1["자산총계"],
        current_liabilities: object1["유동부채"],
        non_current_liabilities: object1["비유동부채"],
        total_liabilities: object1["부채총계"],
        capital_stock: object1["자본금"],
        retained_earning: object1["이익잉여금"],
        total_stockholders_equity: object1["자본총계"],
        sales: object1["매출액"],
        operating_income: object1["영업이익"],
        income_before_income_tax_expenses: object1["법인세차감전 순이익"],
        net_income: object1["당기순이익"],
      });
      res.send("정상적으로 저장되었습니다.");
    }
  })
);

// 단일회사 전체 재무제표 mysql
router.post(
  "/fnlttSinglAcntAll",
  catchErrors(async (req, res, next) => {
    var findCode = await models.corpCode.findOne({
      raw: true,
      where: {
        corp_code: req.body.corp_code,
      },
    });
    var findData = await models.fnlttSinglAcntAll.findOne({
      raw: true,
      where: {
        stock_code: findCode.stock_code,
        bsns_year: req.body.bsns_year,
        reprt_code: req.body.reprt_code,
      },
    });
    console.log(findData);
    if (findData) {
      res.send(
        "이미 저장되어있는 데이터 입니다.",
        findCode.stock_name,
        findData.stock_code,
        findData.bsns_year,
        findData.reprt_code
      );
    } else {
      var result = await opendartLib.fnlttSinglAcnt(
        req.body.corp_code,
        req.body.bsns_year,
        req.body.reprt_code
      );
      console.log(result);
      if (result.status == "000") {
        console.log("fnlttSinglAcnt 이프문 통과");
        res.send("저장되었습니다.");
      } else {
        console.log(result.status);
      }
    }
  })
);

// mongodb corpcode create
router.post(
  "/mongodbcreate",
  catchErrors(async (req, res, next) => {
    var findAllCode = await models.corpCode.findAll({
      raw: true,
    });
    console.log(findAllCode[3]);
    // for (let index = 0; index < Object.keys(findAllCode).length; index++) {
    //   await CorpCode.create({
    //     corp_name: findAllCode[index].corp_name,
    //     stock_code: findAllCode[index].stock_code,
    //     corp_code: findAllCode[index].corp_code,
    //     modify_date: findAllCode[index].modify_date,
    //   });
    // }
    return console.log("hi");
  })
);

router.get("/mongodbread", function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("User 전체 조회 실패.");
    res.status(200).send(users);
  });
});

module.exports = router;
