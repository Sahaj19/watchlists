import { HomeOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Flex, Typography, theme } from 'antd';
import usePageTitle from '../hooks/usePageTitle';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

function NotFound() {
  usePageTitle('Watchlists | Page Not Found');
  const navigate = useNavigate();
  const { token } = theme.useToken();

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      gap={20}
      style={{ minHeight: '100vh', background: token.colorBgLayout, padding: 24, textAlign: 'center' }}
    >
      <VideoCameraOutlined style={{ fontSize: 80, color: token.colorPrimary }} />

      <Text strong style={{ fontSize: 72, lineHeight: 1, color: token.colorPrimary }}>404</Text>

      <Title level={2} style={{ margin: 0 }}>This page didn't make the final cut 🎬</Title>

      <Paragraph type="secondary" style={{ maxWidth: 520, marginBottom: 8, fontSize: 16 }}>
        Looks like the page you're trying to visit doesn't exist, has been moved, or the URL is incorrect.
      </Paragraph>

      <Button
        type="primary"
        size="large"
        icon={<HomeOutlined />}
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </Flex>
  );
}

export default NotFound;