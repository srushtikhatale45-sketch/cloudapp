import { useState } from "react";
import { backupApi } from "../../api/axios";

const Backup = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setError("");
    setStatus(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await backupApi.post("/api/backup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(res.data.backup);
    } catch (err) {
      setError(err.response?.data?.message || "Backup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Create Backup</h1>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Select a file to back up</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded font-medium"
          >
            {loading ? "Backing up..." : "Start Backup"}
          </button>
        </form>

        {error && <p className="bg-red-900/40 text-red-300 text-sm p-2 rounded mt-4">{error}</p>}

        {status && (
          <div className="bg-green-900/30 border border-green-800 rounded p-4 mt-4">
            <p className="text-green-300 font-medium mb-1">Backup completed</p>
            <p className="text-sm text-slate-400">File: {status.originalName}</p>
            <p className="text-sm text-slate-400">Size: {status.sizeBytes} bytes</p>
            <p className="text-sm text-slate-500 mt-1 break-all">Storage key: {status.storageKey}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Backup;
