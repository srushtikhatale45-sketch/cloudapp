import React, { useState, useEffect } from 'react';   // ✅ Add React imports
import api from '../../services/api';

const History = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Correct endpoint: /backup/history (not /history)
    api.get('/backup/history')
      .then(res => {
        const data = res.data || [];
        // If data is an object and has a 'backups' array, use it
        const backupsArray = data.backups && Array.isArray(data.backups)
          ? data.backups
          : (Array.isArray(data) ? data : []);
        setBackups(backupsArray);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading history...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Backup History</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {backups.length === 0 ? (
            <li className="px-4 py-4 text-center text-gray-500">No backups found</li>
          ) : (
            backups.map((b) => (
              <li key={b.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-blue-600">Backup #{b.id}</p>
                    <p className="text-sm text-gray-500">
                      {b.created_at ? new Date(b.created_at).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      b.status === 'success' ? 'bg-green-100 text-green-800' :
                      b.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {b.status || 'unknown'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {b.size ? `${b.size} bytes` : 'N/A'}
                    </span>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default History;