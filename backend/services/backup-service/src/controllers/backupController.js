const { query } = require('../config/database');
const axios = require('axios');

// ========== Start a new backup ==========
exports.startBackup = async (req, res) => {
  const userId = req.userId;
  const { folders } = req.body;

  if (!folders || !Array.isArray(folders) || folders.length === 0) {
    return res.status(400).json({ error: 'Folders must be a non‑empty array' });
  }

  // Declare backupId in the outer scope so it's accessible in catch
  let backupId = null;

  try {
    // 1. Create backup record with status 'in_progress'
    const backupResult = await query(
      'INSERT INTO backups (user_id, status) VALUES ($1, $2) RETURNING id',
      [userId, 'in_progress']
    );
    backupId = backupResult.rows[0].id;

    // 2. Get the upload service URL
    const uploadUrl = process.env.UPLOAD_SERVICE_URL;
    if (!uploadUrl) {
      throw new Error('UPLOAD_SERVICE_URL is not defined in .env');
    }

    // 3. Call upload-service
    const uploadRes = await axios.post(`${uploadUrl}/upload`, {
      userId,
      backupId,
      folders,
    });

    const { spacePath, size } = uploadRes.data;

    // 4. Save backup version
    await query(
      'INSERT INTO backup_versions (backup_id, version, space_path) VALUES ($1, $1, $2)',
      [backupId, spacePath]
    );

    // 5. Update backup status to success
    await query(
      'UPDATE backups SET status = $1, size = $2 WHERE id = $3',
      ['success', size, backupId]
    );

    // 6. Notify success (optional)
    const notifyUrl = process.env.NOTIFICATION_SERVICE_URL;
    if (notifyUrl) {
      await axios.post(`${notifyUrl}/notify`, {
        userId,
        subject: 'Backup Successful',
        message: `Backup #${backupId} completed successfully at ${new Date().toISOString()}`,
      }).catch(() => console.warn('Notification service unreachable'));
    }

    res.status(201).json({
      backupId,
      status: 'success',
      message: 'Backup completed successfully',
    });

  } catch (err) {
    console.error('❌ Backup failed:', err.message);

    // If backup record was created, mark it as failed
    if (backupId) {
      try {
        await query('UPDATE backups SET status = $1 WHERE id = $2', ['failed', backupId]);
      } catch (dbErr) {
        console.error('Failed to update backup status:', dbErr.message);
      }
    }

    // Try to send failure notification
    const notifyUrl = process.env.NOTIFICATION_SERVICE_URL;
    if (notifyUrl) {
      try {
        await axios.post(`${notifyUrl}/notify`, {
          userId,
          subject: 'Backup Failed',
          message: `Backup failed: ${err.message}`,
        });
      } catch (_) {
        console.warn('Could not send failure notification');
      }
    }

    res.status(500).json({
      error: 'Backup failed',
      details: err.message,
    });
  }
};

// ========== Get backup history ==========
exports.getHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await query(
      `SELECT id, created_at, size, status
       FROM backups
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ History error:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};