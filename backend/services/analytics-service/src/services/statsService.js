const Backup = require("../models/Backup");
const { fn, col } = require("sequelize");

const getSummary = async () => {
  const totalBackups = await Backup.count();
  const totalBytesResult = await Backup.findOne({
    attributes: [[fn("SUM", col("sizeBytes")), "totalBytes"]],
    raw: true,
  });

  const latest = await Backup.findOne({ order: [["createdAt", "DESC"]] });

  return {
    totalBackups,
    totalBytes: parseInt(totalBytesResult.totalBytes || 0, 10),
    totalMB: (parseInt(totalBytesResult.totalBytes || 0, 10) / (1024 * 1024)).toFixed(2),
    latestBackup: latest ? { name: latest.originalName, createdAt: latest.createdAt } : null,
  };
};

module.exports = { getSummary };
