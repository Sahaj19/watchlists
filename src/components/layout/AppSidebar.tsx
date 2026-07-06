import {
  HomeOutlined,
  HeartOutlined,
  UserOutlined,
  BulbOutlined,
} from '@ant-design/icons';

import {
  Divider,
  Flex,
  Layout,
  Menu,
  Switch,
  Typography,
} from 'antd';

import { NavLink, useLocation } from 'react-router-dom';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const { Sider } = Layout;
const { Title, Text } = Typography;

function AppSidebar() {
  const location = useLocation();

  const { themeMode, toggleTheme } = useTheme();
  const { currentUser } = useAuth();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: '/watchlist',
      icon: <HeartOutlined />,
      label: <NavLink to="/watchlist">My Watchlist</NavLink>,
    },
  ];

  return (
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
          🎬 Watchlists
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
        gap={4}
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

        <Text type="secondary">
          {currentUser
            ? 'Welcome back!'
            : 'Login to save your watchlist.'}
        </Text>
      </Flex>
    </Sider>
  );
}

export default AppSidebar;