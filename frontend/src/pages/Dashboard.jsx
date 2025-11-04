import React from 'react';
import { useAuth } from '../auth/useAuth';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const auth = useAuth();
  const { data: user, isLoading, error, refetch } = useUser();
  const navigate = useNavigate();

  const onLogout = async () => {
    await auth.logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 720, margin: '20px auto' }}>
      <h2>Dashboard</h2>
      <div>
        <button onClick={onLogout}>Logout</button>
      </div>

      <div style={{ marginTop: 16 }}>
        {isLoading && <div>Loading user...</div>}
        {error && <div style={{ color: 'red' }}>Error loading user</div>}
        {user && (
          <div>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>ID:</b> {user.id}</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => refetch()}>Refetch protected user</button>
      </div>
    </div>
  );
}
