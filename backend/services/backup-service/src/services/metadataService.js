const Backup = require("../models/Backup");

const createBackupRecord = async ({ originalName, storageKey, bucket, sizeBytes, isRecurring = false }) => {
  return Backup.create({ originalName, storageKey, bucket, sizeBytes, status: "completed", isRecurring });
};

const listBackups = async () => {
  return Backup.findAll({ order: [["createdAt", "DESC"]] });
};

const listRecurringBackups = async () => {
  return Backup.findAll({ where: { isRecurring: true }, order: [["createdAt", "DESC"]] });
};

const setRecurring = async (id, isRecurring) => {
  const backup = await Backup.findByPk(id);
  if (!backup) throw new Error("Backup not found");
  backup.isRecurring = isRecurring;
  await backup.save();
  return backup;
};

const getBackupById = async (id) => {
  const backup = await Backup.findByPk(id);
  if (!backup) throw new Error("Backup not found");
  return backup;
};

module.exports = { createBackupRecord, listBackups, listRecurringBackups, setRecurring, getBackupById };
