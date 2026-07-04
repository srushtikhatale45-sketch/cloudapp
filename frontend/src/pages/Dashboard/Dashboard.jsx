import { useEffect, useState } from 'react';
import api from '../../services/api';
import StatsCard from '../../components/StatsCard';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStorage: 0,
    successRate: 0,
    lastBackup: null,
    versionCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics/stats')
      .then(res => {
        // Ensure we have all fields with defaults
        const data = res.data || {};
        setStats({
          totalStorage: data.totalStorage ?? 0,
          successRate: data.successRate ?? 0,
          lastBackup: data.lastBackup ?? null,
          versionCount: data.versionCount ?? 0,
        });
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err);
        // Keep default stats (already set)
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  // Safe formatting with fallbacks
  const storageGB = (stats.totalStorage / 1e9).toFixed(2);
  const successRate = stats.successRate.toFixed(0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Storage Used"
          value={`${storageGB} GB`}
          subtitle={`of ${(stats.totalStorage / 1e9 * 1.2).toFixed(2)} GB`}
        />
        <StatsCard
          title="Success Rate"
          value={`${successRate}%`}
          subtitle="Last 30 days"
        />
        <StatsCard
          title="Last Backup"
          value={stats.lastBackup ? new Date(stats.lastBackup).toLocaleString() : 'Never'}
        />
        <StatsCard
          title="Available Versions"
          value={stats.versionCount}
          subtitle="Restore points"
        />
      </div>
    </div>
  );
};

export default Dashboard;