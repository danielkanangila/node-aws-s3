const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const storage = require("./lib/multer-s3-storage");

// AWS settings
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-west-2",
});

// create s3 instance
const s3 = new AWS.S3();

const upload = multer({
  storage: storage({
    s3,
    bucket: "express-groomer",
    uploadTo: (req, file) => `medias/${Date.now()}-${file.originalname}`,
  }),
});

const app = express();

app.use(express.json());

app.post("/post_file", upload.single("avatar"), (req, res) => {
  console.log(req.file);

  res.send("ok");
});

app.listen(5000, () => {
  console.log("Application listen on port 5000");
});
