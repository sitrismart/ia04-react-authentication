import React, { useState, useEffect } from 'react';
import { setAccessToken as setAccessTokenInApi, clearAccessToken as clearAccessTokenInApi } from '../api/axios';
import api from '../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // push to api module
    setAccessTokenInApi(accessToken);
  }, [accessToken]);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await api.post('/auth/login', { email, password });
      return res.data; // { accessToken, refreshToken, user }
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setUser(data.user);
      // invalidate/refresh queries if needed
      queryClient.invalidateQueries(['user']);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        await api.post('/auth/logout', { refreshToken });
      } catch (err) {
          // ignore errors on logout
          console.error('Logout error:', err);
      } finally {
        setAccessToken(null);
        clearAccessTokenInApi();
        localStorage.removeItem('refreshToken');
        setUser(null);
        queryClient.clear(); // or selectively remove queries
      }
    }
  });

  const value = {
    accessToken,
    setAccessToken,
    user,
    setUser,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    loginState: loginMutation,
    logoutState: logoutMutation,
    isAuthenticated: !!accessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
