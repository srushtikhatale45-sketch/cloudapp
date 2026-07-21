const express = require("express");
const multer = require("multer");
const router = express.Router();
const { createBackup, getBackups } = require("../controllers/backupController");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 500 * 1024 * 1024 } });

router.post("/", upload.single("file"), createBackup);
router.get("/", getBackups);

module.exports = router;
