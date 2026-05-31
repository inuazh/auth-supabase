import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerUser, type AuthResponse, type RegisterPayload } from '../api/authApi';
import { useAuth } from '../auth/AuthContext';

export function useRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation<AuthResponse, unknown, RegisterPayload>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.access_token) {
        login(data.access_token, data.user);
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    },
  });
}