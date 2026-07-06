import { Card, Col, Flex, Row, Skeleton } from 'antd';

function MovieDetailsSkeleton() {
  return (
    <Flex vertical gap={32} style={{ maxWidth: 1180, margin: '0 auto', width: '100%', padding: '24px 0' }}>
      {/* Back Button */}
      <Skeleton.Button
        active
        style={{ width: 90 }}
      />

      {/* Hero Section */}
      <Card bodyStyle={{ padding: 24 }}>
        <Row gutter={32}>
          <Col xs={24} md={8}>
            <Skeleton.Image
              active
              style={{
                width: '100%',
                height: 500,
              }}
            />
          </Col>

          <Col xs={24} md={16}>
            <Flex vertical gap={20}>
              <Skeleton.Input
                active
                block
                style={{ height: 40 }}
              />

              <Flex wrap gap={8}>
                <Skeleton.Button active size="small" />
                <Skeleton.Button active size="small" />
                <Skeleton.Button active size="small" />
              </Flex>

              <Skeleton.Input
                active
                style={{ width: 220 }}
              />

              <Flex wrap gap={12}>
                <Skeleton.Button active block />
                <Skeleton.Button active block />
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Card>

      {/* Ratings */}
      <Row gutter={[16, 16]}>
        {[1, 2, 3].map((item) => (
          <Col
            key={item}
            xs={24}
            sm={12}
            md={8}
          >
            <Card style={{ minHeight: 140 }}>
              <Skeleton
                active
                paragraph={{ rows: 1 }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Information */}
      <Card>
        <Skeleton
          active
          paragraph={{ rows: 8 }}
        />
      </Card>
    </Flex>
  );
}

export default MovieDetailsSkeleton;