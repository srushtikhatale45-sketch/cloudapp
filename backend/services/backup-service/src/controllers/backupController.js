const { query } = require('../config/database');
const axios = require('axios');

exports.startBackup = async (req, res) => {
  const userId = req.userId;
  const { folders } = req.body;

  // Create backup record
  const backup = await query(
    'INSERT INTO backups (user_id, status) VALUES ($1, $2) RETURNING id',
    [userId, 'in_progress']
  );
  const backupId = backup.rows[0].id;

  try {
    const uploadRes = await axios.post(`${process.env.UPLOAD_SERVICE_URL}/upload`, {
      userId,
      backupId,
      folders
    });
    const { spacePath, size } = uploadRes.data;

    await query(
      'INSERT INTO backup_versions (backup_id, version, space_path) VALUES ($1, $1, $2)',
      [backupId, spacePath]
    );
    await query('UPDATE backups SET status = $1, size = $2 WHERE id = $3', ['success', size, backupId]);

    // Notify success
    await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/notify`, {
      userId,
      subject: 'Backup Successful',
      message: `Backup ${backupId} completed`
    });

    res.json({ backupId, status: 'success' });
  } catch (err) {
    await query('UPDATE backups SET status = $1 WHERE id = $2', ['failed', backupId]);
    res.status(500).json({ error: 'Backup failed' });
  }
};

exports.getBackups = async (req, res) => {
  const userId = req.userId;
  const result = await query(
    'SELECT * FROM backups WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  res.json(result.rows);
};