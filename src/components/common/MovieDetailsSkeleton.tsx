import { Card, Col, Flex, Grid, Row, Skeleton } from "antd";
import { MOVIE_CARD_WIDTH, MOVIE_POSTER_HEIGHT } from "../../utils/constants";

const { useBreakpoint } = Grid;

function MovieDetailsSkeleton() {
  const screens = useBreakpoint();

  return (
    <Flex vertical gap={32} style={{ maxWidth: 1180, margin: "0 auto", width: "100%", padding: "24px 10px" }}>
      {/* Back Button */}
      <Skeleton.Button active style={{ width: 90, height: 36 }} />

      {/* Hero Section */}
      <Card styles={{ body: { padding: 0 } }}>
        <Flex vertical={!screens.md} gap={32} style={{ padding: screens.md ? 32 : 16 }} align={screens.md ? "flex-start" : "center"}>
          <Skeleton.Image active style={{ width: MOVIE_CARD_WIDTH, height: MOVIE_POSTER_HEIGHT }} />

          <Flex vertical style={{ flex: 1, minHeight: MOVIE_POSTER_HEIGHT, width: "100%" }}>
            {/* Title */}
            <Skeleton.Input active style={{ width: "100%", height: 36, marginBottom: 24 }} />

            {/* Genres */}
            <Flex wrap gap={8} style={{ marginBottom: 24 }} justify={screens.md ? "flex-start" : "center"}>
              <Skeleton.Button active size="small" />
              <Skeleton.Button active size="small" />
              <Skeleton.Button active size="small" />
            </Flex>

            {/* Plot Card */}
            <Card size="small" style={{ flex: 1, marginBottom: 24 }} >
              <Skeleton active title={false} paragraph={{ rows: 3 }} />
              <Skeleton.Button active style={{ width: 170, marginTop: 8 }} />
            </Card>

            {/* Buttons */}
            <Flex wrap gap={12} justify={screens.md ? "flex-start" : "center"}>
              <Skeleton.Button active style={{ width: 190 }} />
              <Skeleton.Button active style={{ width: 150 }} />
              <Skeleton.Button active style={{ width: 130 }} />
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {/* Ratings */}
      <Flex vertical gap={20}>
        <Skeleton.Input active style={{ width: 140, height: 28 }} />

        <Row gutter={[16, 16]}>
          {[1, 2, 3].map((item) => (
            <Col key={item} xs={24} sm={24} md={12} xl={8}>
              <Card>
                <Flex align="center" gap={14}>
                  <Skeleton.Avatar active size={48} />

                  <Flex vertical gap={8}>
                    <Skeleton.Input active style={{ width: 120 }} />
                    <Skeleton.Input active style={{ width: 80 }} />
                  </Flex>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </Flex>

      {/* Awards */}
      <Card>
        <Flex vertical gap={20}>
          <Skeleton.Input active style={{ width: 140, height: 28 }} />
          <Skeleton active title={false} paragraph={{ rows: 1 }} />
        </Flex>
      </Card>

      {/* Movie Info */}
      <Card>
        <Row gutter={[40, 32]}>
          {/* Plot */}
          <Col xs={24} lg={14}>
            <Skeleton.Input active style={{ width: 120, height: 28, marginBottom: 24 }} />
            <Skeleton active title={false} paragraph={{ rows: 6 }} />
          </Col>

          {/* Details */}
          <Col xs={24} lg={10}>
            <Skeleton.Input active style={{ width: 120, height: 28, marginBottom: 24 }} />

            <Flex vertical gap={22}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Flex key={index} align="center" gap={12}>
                  <Skeleton.Avatar active size={24} shape="circle" />
                  <Skeleton.Input active style={{ width: "80%" }} />
                </Flex>
              ))}
            </Flex>
          </Col>
        </Row>
      </Card>
    </Flex>
  );
}

export default MovieDetailsSkeleton;