const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');

// Shared middleware
const rateLimiter = require('../../../shared/middleware/rateLimiter');
const errorHandler = require('../../../shared/middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('combined'));
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.use(errorHandler);

module.exports = app;