const axios = require("axios");
const { BACKUP_SERVICE_URL } = require("../config/services");

const runScheduledBackup = async () => {
  // Note: this is a placeholder trigger. In a real system, this would fetch
  // a list of files/sources to back up (e.g. from a database of user schedules)
  // and call backup-service for each one. For now, it confirms backup-service
  // is reachable and logs the check.
  const response = await axios.get(`${BACKUP_SERVICE_URL}/api/backup`);
  console.log(`Backup service reachable. Current backup count: ${response.data.length}`);
  return response.data;
};

module.exports = { runScheduledBackup };
