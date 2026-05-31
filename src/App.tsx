import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { PublicRoute } from './auth/PublicRoute';

// Temporary
function LoginPlaceholder() {
  return <div className="p-8 text-xl">Login page (TODO)</div>;
}
function DashboardPlaceholder() {
  return <div className="p-8 text-xl">Dashboard (protected) ✅</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPlaceholder />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPlaceholder />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}