import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/authApi';
import { useAuth } from '../auth/AuthContext';

export function useProfile() {
  const { isAuthenticated, user } = useAuth();

  return useQuery({
    queryKey: ['profile', user?.id],

    queryFn: getProfile,

    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}