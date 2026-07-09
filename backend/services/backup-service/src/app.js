const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const backupRoutes = require('./routes/backupRoutes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/backup', backupRoutes);

module.exports = app;