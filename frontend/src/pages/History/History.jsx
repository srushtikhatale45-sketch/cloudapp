import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backupApi } from "../../api/axios";

const History = () => {
  const [backups, setBackups] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  const loadBackups = () => {
    backupApi
      .get("/api/backup")
      .then((res) => setBackups(res.data))
      .catch(() => setError("Could not load backup history."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBackups();
  }, []);

  const handleToggleRecurring = async (backup) => {
    setTogglingId(backup.id);
    try {
      await backupApi.patch(`/api/backup/${backup.id}/recurring`, {
        isRecurring: !backup.isRecurring,
      });
      setBackups((prev) =>
        prev.map((b) => (b.id === backup.id ? { ...b, isRecurring: !b.isRecurring } : b))
      );
    } catch (err) {
      setError("Could not update auto-repeat setting.");
    } finally {
      setTogglingId(null);
    }
  };

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
              {b.isRecurring && (
                <span className="inline-block mt-2 text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded">
                  Auto-repeats daily
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleRecurring(b)}
                disabled={togglingId === b.id}
                className={`px-3 py-1.5 rounded text-sm whitespace-nowrap disabled:opacity-50 ${
                  b.isRecurring
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
              >
                {togglingId === b.id ? "..." : b.isRecurring ? "Auto-repeat: On" : "Auto-repeat: Off"}
              </button>
              <Link
                to={`/restore?key=${encodeURIComponent(b.storageKey)}&bucket=${b.bucket}`}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap"
              >
                Restore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
