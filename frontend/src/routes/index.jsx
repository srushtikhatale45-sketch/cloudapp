import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Backup from '../pages/Backup/Backup';
import Restore from '../pages/Restore/Restore';
import History from '../pages/History/History';
import Analytics from '../pages/Analytics/Analytics';
import Settings from '../pages/Settings/Settings';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Navigate to="/dashboard" />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/backup"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Backup />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/restore"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Restore />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/history"
      element={
        <ProtectedRoute>
          <MainLayout>
            <History />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Analytics />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Settings />
          </MainLayout>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;