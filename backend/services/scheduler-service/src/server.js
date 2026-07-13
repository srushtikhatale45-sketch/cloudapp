require('dotenv').config();
const app = require('./app');
const { schedule } = require('./cron');
const logger = require('../../../shared/logger/winston');
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
  logger.info(`⏰ Scheduler service running on port ${PORT}`);
  // Initialize cron jobs after server is up
  schedule();
});