import { apiClient } from './apiClient';

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}


export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    '/auth/v1/token?grant_type=password',
    payload
  );
  return data;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    '/auth/v1/signup',
    payload
  );
  return data;
}

export async function getProfile(): Promise<User> {
  const { data } = await apiClient.get<User>('/auth/v1/user');
  return data;
}

export async function logoutUser(): Promise<void> {
  await apiClient.post('/auth/v1/logout');
}