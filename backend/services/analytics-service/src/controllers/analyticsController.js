const { query } = require('../../../../shared/database/index');

// =======================
// Dashboard Statistics
// =======================
exports.getStats = async (req, res) => {
  const userId = req.userId;

  console.log("📊 Fetching dashboard stats for user:", userId);

  try {
    // =======================
    // Total Storage Used
    // =======================
    console.log("🔍 Query 1: Total Storage");

    const totalSize = await query(
      `SELECT COALESCE(SUM(size), 0) AS total
       FROM backups
       WHERE user_id = $1
       AND status = 'success'`,
      [userId]
    );

    console.log("✅ Total Storage:", totalSize.rows[0]);

    // =======================
    // Success Rate
    // =======================
    console.log("🔍 Query 2: Success Rate");

    const successRate = await query(
      `SELECT
          CASE
              WHEN COUNT(*) = 0 THEN 0
              ELSE COUNT(*) FILTER (WHERE status = 'success') * 100.0 / COUNT(*)
          END AS rate
       FROM backups
       WHERE user_id = $1
       AND created_at > NOW() - INTERVAL '30 days'`,
      [userId]
    );

    console.log("✅ Success Rate:", successRate.rows[0]);

    // =======================
    // Last Backup
    // =======================
    console.log("🔍 Query 3: Last Backup");

    const lastBackup = await query(
      `SELECT created_at
       FROM backups
       WHERE user_id = $1
       AND status = 'success'
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    console.log("✅ Last Backup:", lastBackup.rows[0]);

    // =======================
    // Backup Versions
    // =======================
    console.log("🔍 Query 4: Version Count");

    const versionCount = await query(
      `SELECT COUNT(*) AS count
       FROM backup_versions bv
       JOIN backups b
       ON bv.backup_id = b.id
       WHERE b.user_id = $1`,
      [userId]
    );

    console.log("✅ Version Count:", versionCount.rows[0]);

    // =======================
    // Response
    // =======================
    res.json({
      totalStorage: Number(totalSize.rows[0].total) || 0,
      successRate: Number(successRate.rows[0]?.rate) || 0,
      lastBackup: lastBackup.rows[0]?.created_at || null,
      versionCount: Number(versionCount.rows[0].count) || 0,
    });

  } catch (err) {
    console.error("❌ Stats Error:", err);
    console.error("❌ Stack:", err.stack);

    res.status(500).json({
      error: "Failed to fetch stats",
      message: err.message,
    });
  }
};

// =======================
// Backup Trends (Last 7 Days)
// =======================
exports.getTrends = async (req, res) => {
  const userId = req.userId;

  console.log("📈 Fetching trends for user:", userId);

  try {
    const trends = await query(
      `SELECT
          DATE(created_at) AS date,
          COALESCE(SUM(size), 0) AS total_size
       FROM backups
       WHERE user_id = $1
         AND created_at > NOW() - INTERVAL '7 days'
         AND status = 'success'
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [userId]
    );

    console.log("✅ Raw Trends:", trends.rows);

    const days = [];
    const data = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);

      const dateStr = d.toISOString().slice(0, 10);

      days.push(dateStr);

      const found = trends.rows.find(
        row => row.date.toISOString().slice(0, 10) === dateStr
      );

      data.push(
        found ? Number(found.total_size) / (1024 ** 3) : 0
      );
    }

    res.json({
      labels: days,
      data,
    });

  } catch (err) {
    console.error("❌ Trends Error:", err);
    console.error("❌ Stack:", err.stack);

    res.status(500).json({
      error: "Failed to fetch trends",
      message: err.message,
    });
  }
};