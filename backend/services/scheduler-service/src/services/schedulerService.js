// Orchestrates scheduled jobs – can be extended with more logic.
// For now, it simply exports a function that runs the backup job.
const { runBackupJob } = require('../jobs/backupJob');

exports.runScheduledBackup = async () => {
  console.log('⏰ Running scheduled backup job...');
  await runBackupJob();
};