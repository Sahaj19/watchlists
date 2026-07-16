import { Button, Empty, Flex, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

function ErrorState({ title = 'Something went wrong', description = 'Please try again later.',  onRetry }: ErrorStateProps) {
  return (
    <Flex vertical align="center" justify="center" gap={16} style={{ padding: '64px 24px' }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
      <Flex  vertical align="center" gap={4}>
        <Text strong>{title}</Text>
        <Text type="secondary" style={{ textAlign: "center" }}>{description}</Text>
      </Flex>

      {onRetry && (
        <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>Retry</Button>
      )}
    </Flex>
  );
}

export default ErrorState;