import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, type AuthResponse, type LoginPayload } from '../api/authApi';
import { useAuth } from '../auth/AuthContext';

interface LocationState {
  from?: { pathname: string };
}

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation<AuthResponse, unknown, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.access_token, data.user);
      const from = (location.state as LocationState)?.from?.pathname ?? '/dashboard';
      navigate(from, { replace: true });
    },
  });
}