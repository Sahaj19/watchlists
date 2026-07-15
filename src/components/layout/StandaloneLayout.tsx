import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const { Content } = Layout;

function StandaloneLayout() {
  const { colors } = useTheme();

  return (
    <Layout style={{ minHeight: '100vh', background: colors.background }}>
      <Content style={{ background: colors.background }}>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default StandaloneLayout;