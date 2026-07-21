require("dotenv").config();
const app = require("./app");
const { startSchedule } = require("./cron/cronManager");

const PORT = process.env.PORT || 5000;

startSchedule(process.env.CRON_SCHEDULE || "0 2 * * *");

app.listen(PORT, () => {
  console.log(`Scheduler Service running on port ${PORT}`);
});
