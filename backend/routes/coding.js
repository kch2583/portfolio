var express = require("express");
var router = express.Router();
var catchErrors = require("../lib/async-error");

const multer = require("multer");
const sharp = require("sharp");
const { format } = require("util");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});
var { db, storage } = require("../lib/firebase");
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

router.post(
  "/savePost",
  upload.array("images"),
  catchErrors(async (req, res, next) => {
    console.log(req.files);
    // var thumb_image = await sharp(req.file.buffer).resize(150, 150).toBuffer();
    // console.log(thumb_image);
    // let fileUpload = storage
    //   .bucket()
    //   .file(`coding/temp/temp_${req.file.originalname}`);
    // const blobStream = fileUpload.createWriteStream({
    //   metadata: {
    //     contentType: req.file.mimetype,
    //   },
    // });
    // blobStream.on("error", (error) => {
    //   reject("Something is wrong! Unable to upload at the moment.");
    // });
    // blobStream.end(thumb_image);
  })
);

router.post(
  "/uploadTempImages",
  upload.array("images"),
  catchErrors(async (req, res, next) => {
    // firebase storage /coding/temp에 이미지 임시 저장
    let arrFileName = [];
    const config = {
      action: "read",
      expires: "12-18-2030",
    };

    for (let index = 0; index < req.files.length; index++) {
      let fileUpload = storage
        .bucket()
        .file(`coding/temp/${req.files[index].originalname}`);
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: req.files[index].mimetype,
        },
      });

      arrFileName.push(req.files[index].originalname);

      blobStream.on("error", (error) => {
        reject("Something is wrong! Unable to upload at the moment.");
      });
      blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        // const url = format(
        //   `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
        // );
        // // resolve(url);
        // console.log(url);
      });
      // db에 임시 url 찾을수 있는 파일 이름 넣기

      blobStream.end(req.files[index].buffer);
    }
    await db
      .collection("tempURL")
      .doc("lOLYll6AR3hlpG3yAp8b")
      .update({
        images: [...arrFileName],
      });
    //
    var result = [];
    var doc = await db.collection("tempURL").doc("lOLYll6AR3hlpG3yAp8b").get();
    let imagesData = doc.data()["images"];

    for (var value of imagesData) {
      let file = await storage.bucket().file(`coding/temp/${value}`);
      result.push(file.getSignedUrl(config));
    }
    const urlsArray = await Promise.all(result);
    console.log(urlsArray);
    res.send(urlsArray);

    // firebase storage /coding/temp 에 있는 임시 이미지 불러오기
    // var result = [];
    // const config = {
    //   action: "read",
    //   expires: "12-18-2030",
    // };

    // let [files] = await storage.bucket().getFiles();
    // console.log(files);
    // files.forEach((val, idx, arr) => {
    //   result.push(val.getSignedUrl(config));
    // });
    // // let files = await storage
    // //   .bucket()
    // //   .file(`thumbnail/thumb_${doc.data()[key]["image"]}`);

    // const urlsArray = await Promise.all(result);
    // res.send(urlsArray);

    // temp url 저장소 데이터 얻기 (꼭 나가거나 일이 끝나면 삭제하기)
  })
);

module.exports = router;
