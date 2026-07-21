const express = require("express");
const router = express.Router();
const { triggerManualBackup } = require("../services/schedulerService");

router.post("/trigger", async (req, res) => {
  try {
    const result = await triggerManualBackup();
    res.status(200).json({ message: "Manual backup check triggered", result });
  } catch (err) {
    res.status(500).json({ message: "Trigger failed", error: err.message });
  }
});

router.get("/status", (req, res) => {
  res.status(200).json({ status: "Scheduler running", nextRun: "Daily at 2 AM (server time)" });
});

module.exports = router;
