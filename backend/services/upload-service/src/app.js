const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', uploadRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));
// In app.js, add this before error handler
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});
app.use(errorHandler);

module.exports = app;