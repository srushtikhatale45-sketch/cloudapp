const BackupProgress = () => (
  <div className="mt-4">
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '50%' }}></div>
    </div>
    <p className="text-sm text-gray-500 mt-1">Backup in progress...</p>
  </div>
);

export default BackupProgress;   // ✅ this is required