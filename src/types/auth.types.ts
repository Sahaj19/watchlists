// Authentication Types

import type { User } from './user.types';

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  signup: (email: string) => boolean;
  login: (email: string) => boolean;
  logout: () => void;
}