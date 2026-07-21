const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadFile } = require("../controllers/uploadController");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 500 * 1024 * 1024 } });

router.post("/", upload.single("file"), uploadFile);

module.exports = router;
