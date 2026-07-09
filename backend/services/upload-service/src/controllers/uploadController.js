const archiver = require('archiver');
const crypto = require('crypto');
const { PassThrough } = require('stream');
const s3 = require('../config/spaces');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

exports.uploadBackup = async (req, res) => {
  const { userId, backupId, folders } = req.body;

  // Create a ZIP stream
  const archive = archiver('zip', { zlib: { level: 9 } });
  const passThrough = new PassThrough();
  archive.pipe(passThrough);

  // Add files (dummy for demo – in real you'd read actual files)
  archive.append('Backup content', { name: 'dummy.txt' });
  archive.finalize();

  // Encrypt
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encryptedStream = passThrough.pipe(cipher);

  const keyName = `user${userId}/${new Date().toISOString().slice(0,10)}/backup_${backupId}.zip.enc`;
  const uploadParams = {
    Bucket: process.env.SPACES_BUCKET,
    Key: keyName,
    Body: encryptedStream,
    ACL: 'private',
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    // For size, you could track bytes written; we'll send 0 for now.
    res.json({ spacePath: keyName, size: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};