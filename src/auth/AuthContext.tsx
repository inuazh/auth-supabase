import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { tokenStore } from '../api/tokenStore';
import type { User } from '../api/authApi';

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!tokenStore.get());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = tokenStore.subscribe((token) => {
      setIsAuthenticated(!!token);
      if (!token) setUser(null);
    });
    return unsubscribe;
  }, []);


  useEffect(() => {
  }, []);

  const login = useCallback((accessToken: string, loggedInUser: User) => {
    tokenStore.set(accessToken); 
    setUser(loggedInUser);
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();      
    queryClient.clear();       
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}