import { useState, useEffect } from 'react';
import api from '../../services/api';

const Restore = () => {
  const [backups, setBackups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
  api.get('/history')
    .then(res => {
      const data = res.data || [];
      // If data is an array, use it; otherwise look for a 'backups' property
      const backupsArray = Array.isArray(data)
        ? data
        : (data.backups && Array.isArray(data.backups) ? data.backups : []);
      setBackups(backupsArray);
    })
    .catch(console.error);
}, []);

  const handleRestore = async () => {
    if (!selected) return;
    setRestoring(true);
    setMessage('');
    try {
      const res = await api.post('/restore', { backupId: selected });
      setMessage(`Restore successful! Files extracted to ${res.data.path}`);
    } catch (err) {
      setMessage(`Restore failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Restore Backup</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Select a backup version</h2>
        <select
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={selected || ''}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">-- Choose a backup --</option>
          {backups.map((b) => (
            <option key={b.id} value={b.id}>
              {new Date(b.created_at).toLocaleString()} - {b.size} bytes
            </option>
          ))}
        </select>
        <button
          onClick={handleRestore}
          disabled={!selected || restoring}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {restoring ? 'Restoring...' : 'Restore Selected'}
        </button>
        {message && (
          <div className={`mt-4 p-3 rounded ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restore;