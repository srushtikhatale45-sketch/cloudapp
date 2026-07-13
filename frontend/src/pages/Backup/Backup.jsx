import { useState } from 'react';
import api from '../../services/api'; 
import BackupProgress from '../../components/BackupProgress';

const Backup = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [selectedFolders, setSelectedFolders] = useState(['Documents', 'Projects']);

  const handleBackup = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await api.post('/backup/start', { folders: selectedFolders });
      setStatus({ type: 'success', message: `Backup started (ID: ${res.data.backupId})` });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.error || 'Backup failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Backup</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Select folders to backup</h2>
        <div className="space-y-2 mb-6">
          {['Documents', 'Projects', 'Photos', 'Desktop', 'Downloads'].map((folder) => (
            <label key={folder} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFolders.includes(folder)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFolders([...selectedFolders, folder]);
                  } else {
                    setSelectedFolders(selectedFolders.filter(f => f !== folder));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700">{folder}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleBackup}
          disabled={loading || selectedFolders.length === 0}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Starting...' : 'Start Backup Now'}
        </button>
        {status && (
          <div className={`mt-4 p-3 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status.message}
          </div>
        )}
        {loading && <BackupProgress />}
      </div>
    </div>
  );
};

export default Backup;