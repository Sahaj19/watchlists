import { useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "../../context/AuthContext";
import type { User } from "../../types/user.types";
import * as authService from "../../services/auth.service";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());

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

export default AuthProvider;