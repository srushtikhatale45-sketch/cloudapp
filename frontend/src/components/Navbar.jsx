import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = "text-slate-300 hover:text-white transition-colors";

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-lg font-semibold text-white">CloudBackup</Link>
      <div className="flex items-center gap-6">
        <Link to="/" className={linkClass}>Dashboard</Link>
        <Link to="/backup" className={linkClass}>Backup</Link>
        <Link to="/restore" className={linkClass}>Restore</Link>
        <Link to="/history" className={linkClass}>History</Link>
        <Link to="/analytics" className={linkClass}>Analytics</Link>
        <Link to="/settings" className={linkClass}>Settings</Link>
        {user && (
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
