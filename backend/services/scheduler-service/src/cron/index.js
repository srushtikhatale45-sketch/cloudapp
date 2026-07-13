const cron = require('node-cron');
const { runScheduledBackup } = require('../services/schedulerService');

/**
 * Schedule the backup job to run daily at 2:00 AM.
 * You can change the cron expression as needed.
 */
const schedule = () => {
  // Cron expression: 0 2 * * *  (every day at 2:00 AM)
  cron.schedule('0 2 * * *', async () => {
    console.log(`⏰ Cron job triggered at ${new Date().toISOString()}`);
    await runScheduledBackup();
  });

  console.log('⏰ Scheduler started: Daily backup at 2:00 AM');

  // For testing, you can uncomment a minute‑based schedule:
  // cron.schedule('* * * * *', async () => {
  //   console.log('⏰ Test cron every minute');
  //   await runScheduledBackup();
  // });
};

module.exports = { schedule };