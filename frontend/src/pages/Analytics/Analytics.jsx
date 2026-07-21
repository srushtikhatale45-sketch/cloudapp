import { useEffect, useState } from "react";
import { analyticsApi } from "../../api/axios";
import StatsCard from "../../components/StatsCard";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      analyticsApi.get("/api/analytics/stats"),
      analyticsApi.get("/api/analytics/trends"),
    ])
      .then(([statsRes, trendsRes]) => {
        setStats(statsRes.data);
        setTrends(trendsRes.data);
      })
      .catch(() => setError("Could not load analytics."));
  }, []);

  const maxCount = Math.max(...trends.map((t) => parseInt(t.count, 10)), 1);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Analytics</h1>
      {error && <p className="bg-red-900/40 text-red-300 text-sm p-2 rounded mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard label="Total Backups" value={stats?.totalBackups ?? "-"} />
        <StatsCard label="Total Storage" value={stats ? `${stats.totalMB} MB` : "-"} />
        <StatsCard label="Total Bytes" value={stats?.totalBytes ?? "-"} />
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-white font-medium mb-4">Daily Backup Activity (last 30 days)</h2>
        {trends.length === 0 && <p className="text-slate-400 text-sm">No activity yet.</p>}
        <div className="space-y-2">
          {trends.map((t) => (
            <div key={t.day} className="flex items-center gap-3">
              <span className="text-xs text-slate-400 w-24">{t.day}</span>
              <div className="flex-1 bg-slate-700 rounded h-4 overflow-hidden">
                <div
                  className="bg-blue-600 h-full"
                  style={{ width: `${(parseInt(t.count, 10) / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-400 w-10 text-right">{t.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
