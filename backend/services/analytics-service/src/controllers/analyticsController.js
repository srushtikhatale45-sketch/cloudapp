const { query } = require('../config/database');

exports.getStats = async (req, res) => {
  const userId = req.userId;
  const totalSize = await query(
    `SELECT COALESCE(SUM(size), 0) as total FROM backups WHERE user_id = $1 AND status = 'success'`,
    [userId]
  );
  const successRate = await query(
    `SELECT COUNT(*) FILTER (WHERE status = 'success') * 100.0 / COUNT(*) as rate FROM backups WHERE user_id = $1`,
    [userId]
  );
  const lastBackup = await query(
    `SELECT created_at FROM backups WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
    [userId]
  );
  const versionCount = await query(
    `SELECT COUNT(*) FROM backup_versions bv JOIN backups b ON bv.backup_id = b.id WHERE b.user_id = $1`,
    [userId]
  );
  res.json({
    totalStorage: totalSize.rows[0].total || 0,
    successRate: successRate.rows[0].rate || 0,
    lastBackup: lastBackup.rows[0]?.created_at || null,
    versionCount: versionCount.rows[0].count || 0,
  });
};

exports.getTrends = async (req, res) => {
  // Dummy trends for demo
  res.json({
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    data: [1, 2, 1.5, 3, 2.5, 4, 0]
  });
};