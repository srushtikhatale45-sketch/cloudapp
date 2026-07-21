const Backup = require("../models/Backup");

const createBackupRecord = async ({ originalName, storageKey, bucket, sizeBytes }) => {
  return Backup.create({ originalName, storageKey, bucket, sizeBytes, status: "completed" });
};

const listBackups = async () => {
  return Backup.findAll({ order: [["createdAt", "DESC"]] });
};

module.exports = { createBackupRecord, listBackups };
