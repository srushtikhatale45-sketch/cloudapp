const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// You can add a manual trigger endpoint for testing (optional)
app.post('/trigger', async (req, res) => {
  const { runScheduledBackup } = require('./services/schedulerService');
  try {
    await runScheduledBackup();
    res.json({ message: 'Backup job triggered manually' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;