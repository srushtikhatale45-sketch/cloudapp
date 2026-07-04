import { useState, useEffect } from 'react';
import api from '../../services/api';

const Settings = () => {
  const [settings, setSettings] = useState({
    folders: [],
    schedule: 'daily',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/settings')
      .then(res => setSettings(res.data))
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    try {
      await api.post('/settings', settings);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save settings');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Folders to backup</label>
          <div className="mt-2 space-y-2">
            {['Documents', 'Projects', 'Photos', 'Desktop'].map((folder) => (
              <label key={folder} className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.folders.includes(folder)}
                  onChange={(e) => {
                    const newFolders = e.target.checked
                      ? [...settings.folders, folder]
                      : settings.folders.filter(f => f !== folder);
                    setSettings({ ...settings, folders: newFolders });
                  }}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2">{folder}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Backup Schedule</label>
          <select
            value={settings.schedule}
            onChange={(e) => setSettings({ ...settings, schedule: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="daily">Daily (2 AM)</option>
            <option value="weekly">Weekly (Sunday 2 AM)</option>
            <option value="every6h">Every 6 hours</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Settings
        </button>
        {message && <div className="text-sm text-green-600">{message}</div>}
      </div>
    </div>
  );
};

export default Settings;