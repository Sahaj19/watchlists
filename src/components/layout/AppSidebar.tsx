import { useState } from 'react';
import { HomeOutlined, HeartOutlined, UserOutlined, BulbOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Layout, Menu, Modal, Switch, Typography } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthenticationRequiredModal from '../auth/AuthenticationRequiredModal';
import ConfirmationDialog from '../common/ConfirmationDialog';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME } from '../../utils/constants';

const { Sider } = Layout;
const { Title, Text } = Typography;

function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useTheme();
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
        <span onClick={handleWatchlistClick}>My Watchlist</span>
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
  }

  return (
    <>
    <Sider
      width={260}
      theme={themeMode}
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight:
          themeMode === 'light'
            ? '1px solid #f0f0f0'
            : '1px solid #303030',
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
          }}
        >
          🎬 {APP_NAME}
        </Title>

        <Text type="secondary">
          Find your next favourite movie.
        </Text>
      </Flex>

      <Divider style={{ margin: 0 }} />

      {/* Navigation */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          border: 'none',
          marginTop: 12,
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
          <BulbOutlined />

          <Text>Dark Mode</Text>
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
          <UserOutlined />

          <Text
            strong
            ellipsis={{
              tooltip: currentUser?.email,
            }}
            style={{
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