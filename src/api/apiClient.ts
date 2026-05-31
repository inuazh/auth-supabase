import axios from 'axios';
import { tokenStore } from './tokenStore';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
}

export const apiClient = axios.create({
  baseURL: SUPABASE_URL,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      tokenStore.clear();
    }
    return Promise.reject(error);
  }
);