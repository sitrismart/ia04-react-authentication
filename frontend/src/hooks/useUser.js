import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await api.get('/protected/user');
      return res.data.user;
    },
    retry: false,
    refetchOnWindowFocus: false
  });
}
