import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { BarChart3, LogOut, User, Mail, Hash, RefreshCw, CheckCircle, AlertCircle, Info, Settings } from 'lucide-react';

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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome to your secure portal</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-8">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <img src={`https://avatars.githubusercontent.com/u/112542306?v=4`} alt="User Avatar" className="w-16 h-16 rounded-full" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">User Profile</h2>
                  <p className="text-indigo-100">Your account information</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                    <span className="text-gray-700 font-medium">Loading profile...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-6 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-center">
                    <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                    <div>
                      <h3 className="text-red-800 font-medium">Error Loading Profile</h3>
                      <p className="text-red-600 text-sm mt-1">Failed to retrieve your account information. Please try refreshing.</p>
                    </div>
                  </div>
                </div>
              )}

              {user && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Full Name</h3>
                    </div>
                    <p className="text-gray-700 text-lg">{user.name}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
                    </div>
                    <p className="text-gray-700 text-lg">{user.email}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <Hash className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">User ID</h3>
                    </div>
                    <p className="text-gray-700 text-lg font-mono">{user.id}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <Settings className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Account Actions</h3>
                <p className="text-gray-600">Manage your profile and session</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setMessage(null);
                  refetch()
                    .then(() => setMessage({ type: 'success', text: 'Profile refreshed successfully!' }))
                    .catch(() => setMessage({ type: 'error', text: 'Failed to refresh profile' }));
                }}
                disabled={isFetching}
                className={`inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${isFetching ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isFetching ? (
                  <>
                    <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Profile
                  </>
                )}
              </button>

              {/* Message Display */}
              {message && (
                <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium animate-pulse ${
                  message.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mr-2" />
                  )}
                  {message.text}
                </div>
              )}
            </div>
          </div>     
        </div>
      </main>
    </div>
  );
}
