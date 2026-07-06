import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AuthContextType } from '../types/auth.types';
import type { User } from '../types/user.types';
import * as authService from '../services/auth.service';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  const signup = (email: string) => {
    const success = authService.signup(email);

    if (success) {
      setCurrentUser(authService.getCurrentUser());
    }

    return success;
  };

  const login = (email: string) => {
    const success = authService.login(email);

    if (success) {
      setCurrentUser(authService.getCurrentUser());
    }

    return success;
  };

  const logout = () => {
    authService.clearCurrentUser();
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: currentUser !== null,
      signup,
      login,
      logout,
    }),
    [currentUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}