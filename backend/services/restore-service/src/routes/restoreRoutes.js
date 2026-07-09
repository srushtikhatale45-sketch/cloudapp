const express = require('express');
const { restoreBackup } = require('../controllers/restoreController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.post('/', authMiddleware, restoreBackup);

module.exports = router;