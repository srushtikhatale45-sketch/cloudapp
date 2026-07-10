const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const restoreRoutes = require('./routes/restoreRoutes');
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

app.use('/restore', restoreRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.use(errorHandler);

module.exports = app;