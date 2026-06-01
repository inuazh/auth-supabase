import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading, isError } = useProfile();

  function handleLogout() {
    logout();              
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Log out
          </button>
        </div>

        {isLoading && <p className="text-gray-500">Loading profile...</p>}

        {isError && (
          <p className="text-red-600">Failed to load profile. Try again later.</p>
        )}

        {profile && (
          <div className="space-y-2">
            <p className="text-lg">
              Welcome, <span className="font-semibold">{profile.email}</span> 👋
            </p>
            <p className="text-sm text-gray-600">
              User ID: <code className="rounded bg-gray-100 px-1">{profile.id}</code>
            </p>
            <p className="text-sm text-gray-600">Email: {profile.email}</p>
          </div>
        )}

        {!profile && !isLoading && user && (
          <p className="text-lg">Welcome, {user.email} 👋</p>
        )}
      </div>
    </div>
  );
}