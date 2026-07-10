const express = require('express');
const { restoreBackup } = require('../controllers/restoreController');
const auth = require('../middleware/auth');

const router = express.Router();
router.get('/ping', (req, res) => res.json({ message: 'pong' }));

router.post('/', auth, restoreBackup);
module.exports = router;