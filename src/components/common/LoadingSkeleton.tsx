import { Card, Skeleton, Flex, Grid } from "antd";
import { MOVIE_CARD_WIDTH, MOVIE_POSTER_HEIGHT } from "../../utils/constants";

const { useBreakpoint } = Grid;

interface LoadingSkeletonProps {
  count?: number;
}

function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  const screens = useBreakpoint();
  return (
    <Flex wrap gap={24} justify={screens.lg ? "flex-start" : "center"}>
      {Array.from({ length: count }).map((_, index) => (
        <Flex
          key={index}
          style={{
            width: MOVIE_CARD_WIDTH,
            flexShrink: 0,
          }}
        >
          <Card
            style={{
              width: "100%",
              borderRadius: 8,
              overflow: "hidden",
            }}
            cover={
              <Skeleton.Image
                active
                style={{
                  width: MOVIE_CARD_WIDTH,
                  height: MOVIE_POSTER_HEIGHT,
                }}
              />
            }
          >
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        </Flex>
      ))}
    </Flex>
  );
}

export default LoadingSkeleton;
