var express = require("express");
var router = express.Router();

var { db, storage } = require("../lib/firebase");

// var db = require("firebase/firestore");

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

router.get(
  "/meal",
  catchErrors(async (req, res, next) => {
    var snapshot = await db
      .collection("users")
      .get()
      .catch(function (error) {
        console.log(error);
      });

    var result = snapshot.forEach((doc) => {
      doc.data();
    });

    res.send(result);
  })
);

router.post(
  "/saveMeal",
  catchErrors(async (req, res, next) => {
    console.log(req.body.image);
    console.log(req.body);
    await // await db
    //   .collection("users")
    //   .doc(req.body.date)
    //   .set({ [req.body.meal]: { image: req.body.image, memo: req.body.memo } })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    res.send(true);
  })
);

module.exports = router;
