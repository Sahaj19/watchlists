import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeContextType, ThemeMode } from "../types/theme.types";

const STORAGE_KEY = "theme";

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  // Load saved theme immediately when the application starts.
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;

    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  // Toggle between light and dark mode.
  const toggleTheme = () => {
    const newTheme: ThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const value = useMemo(() => ({ themeMode, toggleTheme }), [themeMode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
