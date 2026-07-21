import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { analyticsApi } from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import StatsCard from "../../components/StatsCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    analyticsApi
      .get("/api/analytics/stats")
      .then((res) => setStats(res.data))
      .catch(() => setError("Could not load stats."));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">
        Welcome back{user?.name ? `, ${user.name}` : ""}
      </h1>
      <p className="text-slate-400 mb-6">Here's an overview of your backups.</p>

      {error && <p className="bg-red-900/40 text-red-300 text-sm p-2 rounded mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard label="Total Backups" value={stats?.totalBackups ?? "-"} />
        <StatsCard label="Storage Used" value={stats ? `${stats.totalMB} MB` : "-"} />
        <StatsCard
          label="Latest Backup"
          value={stats?.latestBackup?.name ?? "None yet"}
          subtext={stats?.latestBackup?.createdAt ? new Date(stats.latestBackup.createdAt).toLocaleString() : null}
        />
      </div>

      <div className="flex gap-4">
        <Link to="/backup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
          New Backup
        </Link>
        <Link to="/history" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-medium">
          View History
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
