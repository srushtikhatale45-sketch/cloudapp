import { useAuth } from "../../hooks/useAuth";

const Settings = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Settings</h1>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-lg space-y-4">
        <div>
          <p className="text-sm text-slate-400">Name</p>
          <p className="text-white">{user?.name}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Email</p>
          <p className="text-white">{user?.email}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Account created</p>
          <p className="text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Settings;
