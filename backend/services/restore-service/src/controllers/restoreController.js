const { query } = require('../../../../shared/database/index');
const s3 = require('../config/spaces');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

exports.restoreBackup = async (req, res) => {
  const userId = req.userId;
  const { backupId } = req.body;

  if (!backupId) {
    return res.status(400).json({ error: 'backupId is required' });
  }

  try {
    // 1. Get the latest version's space path
    const versionResult = await query(
      `SELECT space_path
       FROM backup_versions
       WHERE backup_id = $1
       ORDER BY version DESC
       LIMIT 1`,
      [backupId]
    );

    if (versionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Backup version not found' });
    }

    const spacePath = versionResult.rows[0].space_path;

    // 2. Download the file from Spaces
    const downloadParams = {
      Bucket: process.env.SPACES_BUCKET,
      Key: spacePath,
    };

    const { Body } = await s3.send(new GetObjectCommand(downloadParams));

    // 3. Extract the ZIP archive (no encryption)
    const extractDir = path.join(__dirname, '../../temp', `restore_${backupId}_${Date.now()}`);
    fs.mkdirSync(extractDir, { recursive: true });

    await new Promise((resolve, reject) => {
      Body
        .pipe(unzipper.Extract({ path: extractDir }))
        .on('close', resolve)
        .on('error', reject);
    });

    // 4. Log the restore
    await query(
      'INSERT INTO restore_logs (user_id, backup_id) VALUES ($1, $2)',
      [userId, backupId]
    );

    // 5. Return success
    res.json({
      message: 'Restore successful',
      path: extractDir,
    });

  } catch (err) {
    console.error('❌ RESTORE ERROR - FULL:', err);
    console.error('❌ Stack:', err.stack);
    res.status(500).json({
      error: 'Restore failed',
      details: err.message || 'Unknown error occurred',
    });
  }
};