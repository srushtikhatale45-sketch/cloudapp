const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const analyticsRoutes = require('./routes/analyticsRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());

// CORS (allow frontend)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Logging
app.use(morgan('combined'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/analytics', analyticsRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Global error handler
app.use(errorHandler);

module.exports = app;