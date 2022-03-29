var express = require("express");
var router = express.Router();

var catchErrors = require("../lib/async-error");
var bodyWeight = require("../db/bodyWeight");

router.get(
  "/BodyWeight",
  catchErrors(async (req, res, next) => {
    var result = await bodyWeight.find({});
    res.send(result);
  })
);

router.post(
  "/saveBodyWeight",
  catchErrors(async (req, res, next) => {
    var result = await bodyWeight.updateOne(
      { date: req.body.date },
      { $set: { weight: req.body.weight } },
      { upsert: true }
    );

    res.send(result);
  })
);

module.exports = router;
