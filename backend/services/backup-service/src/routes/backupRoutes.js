const express = require('express');
const { startBackup, getBackups } = require('../controllers/backupController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.post('/start', authMiddleware, startBackup);
router.get('/history', authMiddleware, getBackups);

module.exports = router;