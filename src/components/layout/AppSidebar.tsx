import { useState } from "react";
import {
  HomeOutlined,
  HeartOutlined,
  UserOutlined,
  BulbOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Layout,
  Menu,
  Switch,
  Typography,
  Badge,
  Avatar,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import AuthenticationRequiredModal from "../auth/AuthenticationRequiredModal";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { notificationService } from "../../services/notification.service";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { useWatchlist } from "../../hooks/useWatchlist";
import { APP_NAME } from "../../utils/constants";

const { Sider } = Layout;
const { Title, Text } = Typography;

function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeMode, toggleTheme, colors } = useTheme();
  const { watchlist } = useWatchlist();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const { currentUser, logout, isAuthenticated } = useAuth();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home"
    },
    {
      key: "/watchlist",
      icon: <HeartOutlined />,
      label: (
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
          <span>My Watchlist</span>

          <Badge
            count={watchlist.length}
            color={colors.primary}
            style={{ boxShadow: "none" }}
            size="medium"
          />
        </Flex>
      ),
    },
  ];

  function handleMenuClick({ key }: { key: string }) {
    if (key === "/watchlist") {
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }
      navigate("/watchlist");
      return;
    }
    navigate(key);
  }

  function handleLogout() {
    logout();
    navigate("/");
    setShowLogoutConfirmation(false);
    notificationService.success(
      "Logged Out",
      "You have successfully logged out.",
    );
  }

  const userInitials = currentUser?.email?.charAt(0).toUpperCase();

  return (
    <>
      <Sider
        width={260}
        theme="light"
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          background: colors.sidebar,
          borderRight: `1px solid ${colors.sidebarBorder}`,
        }}
      >
        <Flex vertical justify="space-between" style={{ height: "100%" }}>
          <Flex vertical>
            {/* Logo */}
            <Flex
              vertical
              style={{
                padding: 24,
              }}
            >
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: colors.textPrimary,
                }}
              >
                🎬 {APP_NAME}
              </Title>

              <Text
                type="secondary"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Find your next favourite movie.
              </Text>
            </Flex>

            <Divider style={{ margin: 0 }} />

            {/* Navigation */}
            <Menu
              mode="inline"
              theme="light"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{
                border: "none",
                marginTop: 12,
                background: colors.sidebar,
              }}
            />

            <Divider />

            {/* Theme */}
            <Flex
              justify="space-between"
              align="center"
              style={{
                padding: "0 24px",
              }}
            >
              <Flex align="center" gap={8}>
                <BulbOutlined style={{ color: colors.textPrimary }} />

                <Text
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  Dark Mode
                </Text>
              </Flex>

              <Switch checked={themeMode === "dark"} onChange={toggleTheme} />
            </Flex>
          </Flex>

          <Flex vertical>
            <Divider />
            {/* User */}
            <Flex
              vertical
              gap={12}
              style={{
                padding: 24,
              }}
            >
              <Flex align="center" gap={8}>
                <Avatar
                  size={30}
                  style={{
                    background: colors.primary,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {isAuthenticated ? userInitials : <UserOutlined />}
                </Avatar>

                <Flex vertical>
                  <Text
                    strong
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    {currentUser?.email ?? "Guest"}
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textSecondary,
                    }}
                  >
                    {isAuthenticated ? "Signed in" : "Not signed in"}
                  </Text>
                </Flex>
              </Flex>

              {isAuthenticated ? (
                <Button
                  danger
                  block
                  onClick={() => setShowLogoutConfirmation(true)}
                  icon={<LogoutOutlined />}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    block
                    onClick={() => navigate("/login")}
                    icon={<LoginOutlined />}
                  >
                    Login
                  </Button>

                  <Button
                    block
                    onClick={() => navigate("/signup")}
                    icon={<UserAddOutlined />}
                  >
                    Create Account
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sider>

      {/* Authentication Required Modal */}
      <AuthenticationRequiredModal
        open={showAuthModal}
        onCancel={() => setShowAuthModal(false)}
      />

      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        open={showLogoutConfirmation}
        title="Logout"
        content="Are you sure you want to logout?"
        confirmText="Logout"
        danger
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirmation(false)}
      />
    </>
  );
}

export default AppSidebar;
