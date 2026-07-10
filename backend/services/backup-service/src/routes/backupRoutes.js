const express = require('express');
const { startBackup, getHistory } = require('../controllers/backupController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/start', auth, startBackup);
router.get('/history', auth, getHistory);

module.exports = router;