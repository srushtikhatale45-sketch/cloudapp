const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/spaces');

exports.uploadBackup = async (req, res) => {
  try {
    // Log the incoming data
    console.log('📥 Request received:');
    console.log('  - userId:', req.body.userId);
    console.log('  - backupId:', req.body.backupId);
    console.log('  - file:', req.file ? req.file.originalname : 'NO FILE');

    const file = req.file;
    const { userId, backupId } = req.body;

    // Validate inputs
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded. Make sure the field name is "file".' });
    }
    if (!userId || !backupId) {
      return res.status(400).json({ error: 'userId and backupId are required' });
    }

    // Build S3 object key
    const dateStr = new Date().toISOString().slice(0, 10);
    const key = `user${userId}/${dateStr}/backup_${backupId}.zip.enc`;

    console.log(`📦 File size: ${file.size} bytes`);
    console.log(`☁️ Uploading to Spaces: ${key}`);

    // Upload buffer directly
    const uploadParams = {
      Bucket: process.env.SPACES_BUCKET,
      Key: key,
      Body: file.buffer,
      ACL: 'private',
      ContentType: file.mimetype || 'application/octet-stream',
    };

    await s3.send(new PutObjectCommand(uploadParams));

    console.log('✅ Upload successful');
    res.status(201).json({
      spacePath: key,
      size: file.size,
    });

  } catch (err) {
    console.error('❌ Upload error:', err.message);
    res.status(500).json({
      error: 'Upload failed',
      details: err.message,
    });
  }
};