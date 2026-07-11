import { Card, Col, Row, Typography, Flex, Avatar } from "antd";
import { StarFilled } from "@ant-design/icons";
import { hasValue } from "../../utils/movieDetails.utils";
import type { Rating } from "../../types/movie.types";
import { useTheme } from "../../hooks/useTheme";

const { Title, Text } = Typography;

interface MovieRatingsProps {
  imdbRating: string;
  metascore: string;
  ratings: Rating[];
}

function MovieRatings({ imdbRating, metascore, ratings }: MovieRatingsProps) {
  const { colors } = useTheme();
  const rottenTomatoes = ratings.find((rating) => rating.Source === "Rotten Tomatoes");

  const ratingCards = [
    {
      title: "IMDb",
      value: hasValue(imdbRating) ? `${imdbRating}/10` : null,
      color: colors.imdb,
      initials: "IM",
    },
    {
      title: "Rotten Tomatoes",
      value: rottenTomatoes?.Value,
      color: colors.rottenTomatoes,
      initials: "RT",
    },
    {
      title: "Metascore",
      value: hasValue(metascore) ? `${metascore}/100` : null,
      color: colors.metascore,
      initials: "MC",
    },
  ].filter((rating) => hasValue(rating.value));

  if (ratingCards.length === 0) {
    return null;
  }

  return (
    <Flex vertical gap={20}>
      <Flex align="center" gap={10}>
        <StarFilled style={{ color: colors.warning, fontSize: 20 }} />
        <Title level={3} style={{ margin: 0, color: colors.textPrimary }}>Ratings</Title>
      </Flex>
      <Row gutter={[16, 16]}>
        {ratingCards.map((rating) => (
          <Col key={rating.title} xs={24} sm={24} md={12} xl={8}>
            <Card
              hoverable
              style={{ height: "100%", background: colors.surface, borderColor: colors.border }}
              styles={{ body: { padding: 16 } }}
            >
              <Flex align="center" gap={14}>
                <Avatar
                  size={48}
                  style={{
                    background: rating.color,
                    color: colors.white,
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {rating.initials}
                </Avatar>

                <Flex vertical>
                  <Text type="secondary" style={{ fontSize: 15 }}>{rating.title}</Text>
                  <Title level={4} style={{ margin: "2px 0 0" }}>{rating.value}</Title>
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </Flex>
  );
}

export default MovieRatings;