const express = require("express");
const router = express.Router();
const { getStats, getTrends } = require("../controllers/analyticsController");

router.get("/stats", getStats);
router.get("/trends", getTrends);

module.exports = router;
