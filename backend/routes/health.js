var express = require("express");
var router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const format = require("util");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

var { db, storage } = require("../lib/firebase");
const { getStorage, ref, uploadBytes } = require("firebase-admin/storage");

var catchErrors = require("../lib/async-error");
var bodyWeight = require("../db/bodyWeight");
const { Timestamp } = require("firebase-admin/firestore");
const { resolve } = require("path");

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
  "/showMealEvent",
  catchErrors(async (req, res, next) => {
    var date = [];
    var result = [];
    var snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
      date.push(doc.id);
      result.push(doc.data());
    });

    return res.send({ date, result });
  })
);

router.post(
  "/showMealImages",
  catchErrors(async (req, res, next) => {
    var result = [];
    const config = {
      action: "read",
      expires: "12-18-2030",
    };
    var doc = await db.collection("users").doc(req.body.selectedDate).get();
    for (var key in doc.data()) {
      let file = await storage
        .bucket()
        .file(`thumbnail/thumb_${doc.data()[key]["image"]}`);
      result.push(file.getSignedUrl(config));
    }
    const urlsArray = await Promise.all(result);
    res.send(urlsArray);
  })
);

router.post(
  "/saveMeal",
  upload.single("image"),
  catchErrors(async (req, res, next) => {
    //정리해야함
    var thumb_image = await sharp(req.file.buffer).resize(150, 150).toBuffer();
    console.log(thumb_image);
    let fileUpload = storage
      .bucket()
      .file(`thumbnail/thumb_${req.file.originalname}`);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobStream.on("error", (error) => {
      reject("Something is wrong! Unable to upload at the moment.");
    });
    blobStream.end(thumb_image);
    // firebase users 컬렉션에 저장
    await db
      .collection("users")
      .doc(req.body.date)
      .set(
        {
          [req.body.meal]: {
            image: req.file.originalname,
            memo: req.body.memo,
          },
        },
        { merge: true }
      )
      .then(() => {
        // 컬렉션에 저장 후 이미지 파일 storage /images에 저장

        let fileUpload = storage
          .bucket()
          .file(`images/${req.file.originalname}`);
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });

        blobStream.on("error", (error) => {
          reject("Something is wrong! Unable to upload at the moment.");
        });
        // blobStream.on("finish", () => {
        //   // The public URL can be used to directly access the file via HTTP.
        //   const url = format(
        //     `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
        //   );
        //   resolve(url);
        // });
        blobStream.end(req.file.buffer);
        // return fs.unlinkSync(tempFilePath);
      })
      .catch(function (error) {
        console.log(error);
      });

    res.send(true);
  })
);

module.exports = router;
