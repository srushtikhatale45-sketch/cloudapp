import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { restoreApi } from "../../api/axios";

const Restore = () => {
  const [searchParams] = useSearchParams();
  const [storageKey, setStorageKey] = useState(searchParams.get("key") || "");
  const [bucket, setBucket] = useState(searchParams.get("bucket") || "interns3");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const key = searchParams.get("key");
    const bkt = searchParams.get("bucket");
    if (key) setStorageKey(key);
    if (bkt) setBucket(bkt);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await restoreApi.post(
        "/api/restore",
        { storageKey, bucket },
        { responseType: "blob" }
      );

      const filename = storageKey.split("/").pop().replace(/\.zip$/, "");
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Restore failed. Check the storage key and bucket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Restore Backup</h1>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Storage Key</label>
            <input
              type="text"
              value={storageKey}
              onChange={(e) => setStorageKey(e.target.value)}
              placeholder="backups/uuid-filename.zip"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Bucket</label>
            <input
              type="text"
              value={bucket}
              onChange={(e) => setBucket(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded font-medium"
          >
            {loading ? "Restoring..." : "Restore & Download"}
          </button>
        </form>
        {error && <p className="bg-red-900/40 text-red-300 text-sm p-2 rounded mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Restore;
