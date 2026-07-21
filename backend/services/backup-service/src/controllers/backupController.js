const { runBackup } = require("../services/backupOrchestrator");
const { listBackups } = require("../services/metadataService");

const createBackup = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }
    const record = await runBackup(req.file.buffer, req.file.originalname);
    return res.status(201).json({ message: "Backup completed", backup: record });
  } catch (err) {
    console.error("Backup error:", err.response?.data || err.message);
    return res.status(500).json({ message: "Backup failed", error: err.message });
  }
};

const getBackups = async (req, res) => {
  try {
    const backups = await listBackups();
    return res.status(200).json(backups);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch backups", error: err.message });
  }
};

module.exports = { createBackup, getBackups };
