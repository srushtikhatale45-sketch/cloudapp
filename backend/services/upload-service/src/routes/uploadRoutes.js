const express = require('express');
const multer = require('multer');
const { uploadBackup } = require('../controllers/uploadController');

const router = express.Router();

// Configure multer with memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 100 }, // 100 MB
  fileFilter: (req, file, cb) => {
    cb(null, true); // accept all file types
  },
});

// Middleware to handle multer errors
const handleMulter = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('❌ Multer error:', err.message);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.error('❌ Unknown upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }
    next();
  });
};

router.post('/', handleMulter, uploadBackup);

module.exports = router;