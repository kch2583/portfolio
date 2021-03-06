var express = require("express");
// var db = require("../db/index.js");

var catchErrors = require("../lib/async-error");
var router = express.Router();
var opendartLib = require("../lib/opendart");
const fnlttSinglAcnt = require("../models/fnlttSinglAcnt");

const CorpCode = require("../db/corpCode");
const FnlttSinglAcnt = require("../db/fnlttSinglAcnt");
const FnlttSinglAcntAll = require("../db/fnlttSinglAcntAll");

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

router.get(
  "/getCorpNameList",
  catchErrors(async (req, res, next) => {
    // var result = await FnlttSinglAcntAll.find({
    //   corp_code: "01391103",
    // });
    // res.send(result);
    var result = [];
    var findAllCorpName = await CorpCode.find(
      {},
      { _id: 0, corp_name: 1, corp_code: 1 }
    ).sort({ corp_name: 1 });
    for (const i of findAllCorpName) {
      result.push(i);
    }

    res.send(result);
  })
);

router.get(
  "/",
  catchErrors(async (req, res, next) => {
    var result = await FnlttSinglAcnt.find({
      stock_code: "337930",
    });

    res.send(result);
  })
);

// 공시검색 mysql
router.get(
  "/list",
  catchErrors(async (req, res, next) => {
    var result = await opendartLib.list(null, "20200117", "20200117");
    // var result = "hihihiihihihi";

    res.send(result);
  })
);

router.post(
  "/getFnlttSinglAcnt",
  catchErrors(async (req, res, next) => {
    // var findCode = await CorpCode.findOne({ corp_code: req.body.corp_code });
    var result = await opendartLib.fnlttSinglAcnt(
      req.body.corp_code,
      req.body.bsns_year,
      req.body.reprt_code
    );

    res.send(result);
  })
);

// 단일회사 주요계정 저장
router.post(
  "/fnlttSinglAcnt",
  catchErrors(async (req, res, next) => {
    var object1 = {};

    // stock_code를 알아내기위한 기업 고유번호 검색
    var findCode = await CorpCode.findOne({ corp_code: req.body.corp_code });

    // 단일회사 주요계정 opendart에서 가져오기
    var result = await opendartLib.fnlttSinglAcnt(
      req.body.corp_code,
      req.body.bsns_year,
      req.body.reprt_code
    );

    for (let index = 0; index < result.list.length; index++) {
      object1[result.list[index].account_nm] = result.list[index].thstrm_amount;
    }

    // 찾은 주요계정이 mongodb에 이미 저장되어있는지 알아보기
    var findData = await FnlttSinglAcnt.find({
      stock_code: findCode.stock_code,
      bsns_year: req.body.bsns_year,
      reprt_code: req.body.reprt_code,
    });

    if (result.status == "000") {
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
    } else {
      res.send(result.status, result.message);
    }
  })
);

// 단일회사 전체 재무제표 저장
router.post(
  "/fnlttSinglAcntAll",
  catchErrors(async (req, res, next) => {
    // 찾은 주요계정이 mongodb에 이미 저장되어있는지 알아보기
    var findData = await FnlttSinglAcntAll.find({
      corp_code: req.body.corp_code,
      bsns_year: req.body.bsns_year,
      reprt_code: req.body.reprt_code,
    });

    if (findData.length >= 1) {
      res.send("이미 저장되어 있는 데이터입니다.");
    } else {
      var result = await opendartLib.fnlttSinglAcntAll(
        req.body.corp_code,
        req.body.bsns_year,
        req.body.reprt_code,
        "OFS"
      );

      if (result.status == "000") {
        var result2 = {};

        for (let index = 0; index < 4; index++) {
          result2[Object.keys(result.list[0])[index]] = Object.values(
            result.list[0]
          )[index];
        }

        var bs = [];
        var is = [];
        var cis = [];
        var cf = [];
        var sce = [];
        let tempList = [];

        for (let index = 0; index < result.list.length; index++) {
          tempList.push({
            account_id: result.list[index].account_id,
            account_nm: result.list[index].account_nm,
            account_detail: result.list[index].account_detail,
            thstrm_nm: result.list[index].thstrm_nm,
            thstrm_amount: result.list[index].thstrm_amount,
            ord: result.list[index].ord,
          });

          var obj4 = {
            account_id: result.list[index].account_id,
            account_nm: result.list[index].account_nm,
            account_detail: result.list[index].account_detail,
            thstrm_nm: result.list[index].thstrm_nm,
            thstrm_amount: result.list[index].thstrm_amount,
            ord: result.list[index].ord,
          };

          switch (result.list[index].sj_div) {
            case "BS": //재무상태표
              bs.push(obj4);
              continue;
            case "IS": //손익계산서
              is.push(obj4);
              continue;
            case "CIS": //포괄손익계산서
              cis.push(obj4);
              continue;
            case "CF": //현금흐름표
              cf.push(obj4);
              continue;
            case "SCE": //자본변동표
              sce.push(obj4);
              continue;
            default:
              continue;
          }
        }
        await FnlttSinglAcntAll.create({
          rcept_no: result2.rcept_no,
          reprt_code: result2.reprt_code,
          bsns_year: result2.bsns_year,
          corp_code: result2.corp_code,
          bs: bs,
          is: is,
          cis: cis,
          cf: cf,
          sce: sce,
        });
        res.send("정상적으로 저장되었습니다.");
      } else {
        res.send([result.status, result.message]);
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
