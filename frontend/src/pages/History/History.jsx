import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backupApi } from "../../api/axios";

const History = () => {
  const [backups, setBackups] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    backupApi
      .get("/api/backup")
      .then((res) => setBackups(res.data))
      .catch(() => setError("Could not load backup history."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Backup History</h1>

      {error && <p className="bg-red-900/40 text-red-300 text-sm p-2 rounded mb-4">{error}</p>}
      {loading && <p className="text-slate-400">Loading...</p>}

      {!loading && backups.length === 0 && (
        <p className="text-slate-400">No backups yet. <Link to="/backup" className="text-blue-400 hover:underline">Create one</Link>.</p>
      )}

      <div className="space-y-3">
        {backups.map((b) => (
          <div key={b.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{b.originalName}</p>
              <p className="text-sm text-slate-400">{new Date(b.createdAt).toLocaleString()} &middot; {b.sizeBytes} bytes</p>
              <p className="text-xs text-slate-500 mt-1 break-all">{b.storageKey}</p>
            </div>
            <Link
              to={`/restore?key=${encodeURIComponent(b.storageKey)}&bucket=${b.bucket}`}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap"
            >
              Restore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
