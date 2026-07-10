import { useState } from 'react';
import { HomeOutlined, HeartOutlined, UserOutlined, BulbOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Layout, Menu, Switch, Typography, Badge } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthenticationRequiredModal from '../auth/AuthenticationRequiredModal';
import ConfirmationDialog from '../common/ConfirmationDialog';
import { notificationService } from '../../services/notification.service';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useWatchlist } from '../../hooks/useWatchlist';
import { APP_NAME } from '../../utils/constants';

const { Sider } = Layout;
const { Title, Text } = Typography;

function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeMode, toggleTheme, colors } = useTheme();
  const { watchlist } = useWatchlist();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const {
    currentUser,
    logout,
    isAuthenticated,
  } = useAuth();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: '/watchlist',
      icon: <HeartOutlined />,
     label: (
        <Flex
          justify="space-between"
          align="center"
          style={{ width: '100%' }}
        >
          <span onClick={handleWatchlistClick}>My Watchlist</span>

          <Badge
            count={watchlist.length}
            size="medium"
          />
        </Flex>
      )
    },
  ];

  function handleWatchlistClick() {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigate('/watchlist');
  }

  function handleLogout() {
    logout();
    navigate('/');
    setShowLogoutConfirmation(false);
    notificationService.success('Logged Out', 'You have successfully logged out.');
  }

  return (
    <>
    <Sider
      width={260}
      theme="light"
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,

        background: colors.sidebar,
        borderRight: `1px solid ${colors.sidebarBorder}`,
      }}
    >
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
        style={{
          border: 'none',
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
          padding: '0 24px',
        }}
      >
        <Flex
          align="center"
          gap={8}
        >
          <BulbOutlined style={{ color: colors.textPrimary }} />

          <Text
            style={{
              color: colors.textPrimary,
            }}
          >
            Dark Mode
          </Text>
        </Flex>

        <Switch
          checked={themeMode === 'dark'}
          onChange={toggleTheme}
        />
      </Flex>

      <Divider />

      {/* User */}
      <Flex
        vertical
        gap={12}
        style={{
          padding: 24,
        }}
      >
        <Flex
          align="center"
          gap={8}
        >
          <UserOutlined style={{ color: colors.textPrimary }} />

          <Text
            strong
            ellipsis={{
              tooltip: currentUser?.email,
            }}
            style={{
              color: colors.textPrimary,
              maxWidth: 170,
            }}
          >
            {currentUser?.email ?? 'Guest'}
          </Text>
        </Flex>

        {isAuthenticated ? (
          <Button
            danger
            block
            onClick={() => setShowLogoutConfirmation(true)}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              type="primary"
              block
              onClick={() => navigate('/login')}
            >
              Login
            </Button>

            <Button
              block
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
          </>
        )}
      </Flex>
    </Sider>

    {/* Authentication Required Modal */}
    <AuthenticationRequiredModal
      open={showAuthModal}
      onCancel={() =>
          setShowAuthModal(false)
      }
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