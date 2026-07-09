require('dotenv').config();
const app = require('./app');
const cron = require('node-cron');
const axios = require('axios');
const { query } = require('./config/database');

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Scheduler running on port ${PORT}`);
});

// Schedule daily at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Running scheduled backups...');
  const users = await query('SELECT id FROM users');
  for (const user of users.rows) {
    try {
      await axios.post(`${process.env.BACKUP_SERVICE_URL}/backup/start`, {
        userId: user.id,
        folders: ['Documents', 'Projects'] // fetch from user settings in real
      });
    } catch (err) {
      console.error(`Backup failed for user ${user.id}`, err.message);
    }
  }
});