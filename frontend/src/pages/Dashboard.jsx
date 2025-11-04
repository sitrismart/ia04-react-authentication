import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const auth = useAuth();
  const { data: user, isLoading, isFetching, error, refetch } = useUser();
  const [message, setMessage] = useState(null);

  // Auto-hide success/error messages after 3 seconds
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(id);
  }, [message]);
  const navigate = useNavigate();

  const onLogout = async () => {
    await auth.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <button
            onClick={onLogout}
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        <div className="mt-6">
          {isLoading && <div className="text-gray-500">Loading user...</div>}
          {error && <div className="text-red-600">Error loading user</div>}

          {user && (
            <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-100">
              <p className="text-gray-700"><span className="font-semibold">Name:</span> {user.name}</p>
              <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
              <p className="text-gray-700"><span className="font-semibold">ID:</span> {user.id}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center space-x-3">
          <button
            onClick={() => {
              setMessage(null);
              refetch()
                .then(() => setMessage({ type: 'success', text: 'User refreshed' }))
                .catch(() => setMessage({ type: 'error', text: 'Failed to refresh user' }));
            }}
            disabled={isFetching}
            className={`inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isFetching ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isFetching ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Refreshing...
              </>
            ) : (
              'Refresh profile'
            )}
          </button>

          {message && (
            <div className={`${message.type === 'success' ? 'text-green-600' : 'text-red-600'} text-sm`}>{message.text}</div>
          )}
        </div>
      </div>
    </div>
  );
}
