import type { AppTheme } from "../theme/types";

// theme types
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
   colors: AppTheme;
}