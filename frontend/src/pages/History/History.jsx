import { useState, useEffect } from 'react';
import api from '../../services/api';

const History = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/history')
      .then(res => setBackups(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading history...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Backup History</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {backups.map((b) => (
            <li key={b.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-blue-600">Backup #{b.id}</p>
                  <p className="text-sm text-gray-500">{new Date(b.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${b.status === 'success' ? 'bg-green-100 text-green-800' : b.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {b.status}
                  </span>
                  <span className="text-sm text-gray-500">{b.size} bytes</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;