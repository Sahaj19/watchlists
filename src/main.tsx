import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider }  from './context/WatchlistContext';

function AppProvider() {
  const { themeMode, colors } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,

        token: {
          colorPrimary: colors.primary,

          colorBgLayout: colors.background,
          colorBgContainer: colors.surface,

          colorText: colors.textPrimary,
          colorTextSecondary: colors.textSecondary,

          colorBorder: colors.border,

          colorSuccess: colors.success,
          colorWarning: colors.warning,
          colorError: colors.error,
        },

        components: {
          Layout: {
            bodyBg: colors.background,
            siderBg: colors.sidebar,
            headerBg: colors.surface,
          },

          Card: {
            colorBgContainer: colors.surface,
          },

          Menu: {
            itemBg: colors.sidebar,
            itemColor: colors.menuItem,

            itemHoverBg: colors.menuItemHover,
            itemHoverColor: colors.primary,

            itemSelectedBg: colors.menuItemSelected,
            itemSelectedColor: colors.menuItemSelectedText,

            activeBarBorderWidth: 0,
          },
        },
      }}
    >
    <App />
</ConfigProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <WatchlistProvider>
          <AppProvider />
        </WatchlistProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);