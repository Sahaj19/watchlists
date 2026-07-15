import { ConfigProvider, theme } from "antd";
import App from "../../App";
import { useTheme } from "../../hooks/useTheme";

function AppProvider() {
  const { themeMode, colors } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,

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

export default AppProvider;