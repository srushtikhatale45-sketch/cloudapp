const express = require('express');
const { getStats, getTrends } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.get('/stats', authMiddleware, getStats);
router.get('/trends', authMiddleware, getTrends);

module.exports = router;