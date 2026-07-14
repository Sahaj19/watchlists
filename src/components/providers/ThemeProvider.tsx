import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import type { ThemeMode } from "../../types/theme.types";
import { lightTheme, darkTheme } from "../../theme";

const STORAGE_KEY = "theme";

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? "light";
  });

  const colors = themeMode === "light" ? lightTheme : darkTheme;

  const toggleTheme = useCallback(() => {
    const newTheme: ThemeMode = themeMode === "light" ? "dark" : "light";

    setThemeMode(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, [themeMode]);

  const value = useMemo(
    () => ({
      themeMode,
      toggleTheme,
      colors,
    }),
    [themeMode, toggleTheme, colors]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;