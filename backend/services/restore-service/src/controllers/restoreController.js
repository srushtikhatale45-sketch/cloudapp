const { query } = require('../config/database');
const s3 = require('../config/spaces');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

exports.restoreBackup = async (req, res) => {
  const { backupId } = req.body;
  const userId = req.userId;

  const version = await query(
    'SELECT space_path FROM backup_versions WHERE backup_id = $1 ORDER BY version DESC LIMIT 1',
    [backupId]
  );
  if (version.rows.length === 0) return res.status(404).json({ error: 'Backup not found' });

  const spacePath = version.rows[0].space_path;
  const downloadParams = {
    Bucket: process.env.SPACES_BUCKET,
    Key: spacePath,
  };
  const { Body } = await s3.send(new GetObjectCommand(downloadParams));

  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = Buffer.alloc(16, 0); // store IV in real project
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  const extractDir = path.join(__dirname, '../../temp', `restore_${backupId}`);
  fs.mkdirSync(extractDir, { recursive: true });

  await new Promise((resolve, reject) => {
    Body.pipe(decipher)
      .pipe(unzipper.Extract({ path: extractDir }))
      .on('close', resolve)
      .on('error', reject);
  });

  await query('INSERT INTO restore_logs (user_id, backup_id) VALUES ($1, $2)', [userId, backupId]);
  res.json({ message: 'Restore successful', path: extractDir });
};