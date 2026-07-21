const { runScheduledBackup } = require("../jobs/backupJob");

const triggerManualBackup = async () => {
  return runScheduledBackup();
};

module.exports = { triggerManualBackup };
