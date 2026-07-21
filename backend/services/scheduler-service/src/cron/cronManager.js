const cron = require("node-cron");
const { runScheduledBackup } = require("../jobs/backupJob");

let scheduledTask = null;

const startSchedule = (cronExpression = "0 2 * * *") => {
  if (scheduledTask) scheduledTask.stop();

  scheduledTask = cron.schedule(cronExpression, async () => {
    console.log(`[${new Date().toISOString()}] Running scheduled backup...`);
    try {
      await runScheduledBackup();
      console.log("Scheduled backup completed successfully");
    } catch (err) {
      console.error("Scheduled backup failed:", err.message);
    }
  });

  console.log(`Cron scheduled with expression: ${cronExpression}`);
  return scheduledTask;
};

module.exports = { startSchedule };
