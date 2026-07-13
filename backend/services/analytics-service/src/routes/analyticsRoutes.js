const express = require('express');
const { getStats, getTrends } = require('../controllers/analyticsController');
const auth = require('../../../../shared/middleware/auth');
const router = express.Router();

router.get('/stats', auth, getStats);
router.get('/trends', auth, getTrends);
// Debug route – no DB
router.get('/ping', (req, res) => res.json({ message: 'pong' }));
module.exports = router;