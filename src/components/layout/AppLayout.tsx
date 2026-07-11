import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import AppSidebar from './AppSidebar';

const { Sider, Content } = Layout;

function AppLayout() {
  const { colors } = useTheme();
  return (
    <Layout style={{ minHeight: '100vh', background: colors.background }}>
      <Sider width={260} theme="light">
        <AppSidebar />
      </Sider>

      <Layout style={{ background: colors.background }}>
        <Content style={{ padding: '24px', overflow: 'auto', background: colors.background }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;