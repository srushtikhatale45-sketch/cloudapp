const axios = require("axios");
const { BACKUP_SERVICE_URL } = require("../config/services");

const runScheduledBackup = async () => {
  const { data: recurringBackups } = await axios.get(`${BACKUP_SERVICE_URL}/api/backup/recurring`);

  console.log(`Found ${recurringBackups.length} recurring backup(s) to process.`);

  const results = [];
  for (const backup of recurringBackups) {
    try {
      const { data } = await axios.post(`${BACKUP_SERVICE_URL}/api/backup/${backup.id}/rerun`);
      console.log(`Re-ran backup for "${backup.originalName}" -> new id ${data.backup.id}`);
      results.push({ originalId: backup.id, status: "success", newBackup: data.backup });
    } catch (err) {
      console.error(`Failed to re-run backup ${backup.id} (${backup.originalName}):`, err.message);
      results.push({ originalId: backup.id, status: "failed", error: err.message });
    }
  }

  return results;
};

module.exports = { runScheduledBackup };
