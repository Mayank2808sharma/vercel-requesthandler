require("dotenv").config();
import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
  endpoint: process.env.ENDPOINT,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const app = express();

app.get("/*", async (req, res) => {

  const id = "v5s6p";
  const filePath = req.path;
  const contents = await s3
    .getObject({
      Bucket: "vercel",
      Key: `dist/${id}${filePath}`,
    })
    .promise();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";
  res.set("Content-Type", type);
    console.log(type);
  res.send(contents.Body);
});

app.listen(3001);
