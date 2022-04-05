var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer();

var { db, storage } = require("../lib/firebase");

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
  upload.single("image"),
  catchErrors(async (req, res, next) => {
    await db
      .collection("users")
      .doc(req.body.date)
      .set({
        [req.body.meal]: { image: req.file.orginalname, memo: req.body.memo },
      })
      .then(() => {
        const bucket = storage.bucket();
        let fileUpload = storage.bucket().file(req.file.originalname);
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
        blobStream.on("error", (error) => {
          reject("Something is wrong! Unable to upload at the moment.");
        });
        blobStream.on("finish", () => {
          // The public URL can be used to directly access the file via HTTP.
          const url = format(
            `https://storage.googleapis.com/${bucket.name}/images/${fileUpload.name}`
          );
          resolve(url);
        });

        blobStream.end(req.file.buffer);
      })
      .catch(function (error) {
        console.log(error);
      });

    res.send(true);
  })
);

module.exports = router;
