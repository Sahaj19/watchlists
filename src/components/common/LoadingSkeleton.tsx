import { Card, Skeleton, Col, Row } from 'antd';

interface LoadingSkeletonProps {
  count?: number;
}

function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <Row gutter={[24, 24]}>
      {Array.from({ length: count }).map((_, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <Card
            cover={
              <Skeleton.Image active style={{ width: '100%', height: 380 }}/>
            }
          >
            <Skeleton active paragraph={{ rows: 2 }}/>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default LoadingSkeleton;