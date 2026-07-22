const { runBackup, rerunBackup } = require("../services/backupOrchestrator");
const { listBackups, listRecurringBackups, setRecurring } = require("../services/metadataService");

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

const getRecurringBackups = async (req, res) => {
  try {
    const backups = await listRecurringBackups();
    return res.status(200).json(backups);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch recurring backups", error: err.message });
  }
};

const toggleRecurring = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRecurring } = req.body;
    const backup = await setRecurring(id, !!isRecurring);
    return res.status(200).json({ message: "Updated", backup });
  } catch (err) {
    return res.status(404).json({ message: "Backup not found", error: err.message });
  }
};

const rerun = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await rerunBackup(id);
    return res.status(201).json({ message: "Recurring backup completed", backup: record });
  } catch (err) {
    console.error("Rerun error:", err.response?.data || err.message);
    return res.status(500).json({ message: "Rerun failed", error: err.message });
  }
};

module.exports = { createBackup, getBackups, getRecurringBackups, toggleRecurring, rerun };
