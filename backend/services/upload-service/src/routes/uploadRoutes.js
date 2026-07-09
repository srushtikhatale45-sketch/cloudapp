const express = require('express');
const { uploadBackup } = require('../controllers/uploadController');

const router = express.Router();
router.post('/', uploadBackup);

module.exports = router;