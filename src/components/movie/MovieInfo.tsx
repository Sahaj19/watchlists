import { Card, Col, Row, Typography, Flex } from "antd";
import { CalendarOutlined, ClockCircleOutlined, GlobalOutlined, SafetyCertificateOutlined, TagsOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MovieDetails } from "../../types/movie.types";
import { useTheme } from "../../hooks/useTheme";
import MovieDetailItem from "./MovieDetailItem";

const { Title, Paragraph } = Typography;

interface MovieInfoProps {
  movie: MovieDetails;
}

function MovieInfo({ movie }: MovieInfoProps) {
  const { colors } = useTheme();

  return (
    <Card>
      <Row gutter={[40, 32]}>
        {/* Movie Plot */}
        <Col xs={24} lg={14}>
          <Title level={3} style={{ color: colors.textPrimary }}>Plot</Title>
          <Paragraph style={{ color: colors.textSecondary, fontSize: 16, lineHeight: 1.8, marginBottom: 0}}>{movie.Plot}</Paragraph>
        </Col>

        {/* Movie Additional Details */}
        <Col xs={24} lg={10}>
          <Title level={3} style={{ color: colors.textPrimary }}>Details</Title>

          <Flex vertical gap={20}>
            <MovieDetailItem
              icon={<UserOutlined />}
              label="Director"
              value={movie.Director}
            />

            <MovieDetailItem
              icon={<TeamOutlined />}
              label="Actors"
              value={movie.Actors}
            />

            <MovieDetailItem
              icon={<CalendarOutlined />}
              label="Released"
              value={movie.Released}
            />

            <MovieDetailItem
              icon={<SafetyCertificateOutlined />}
              label="Rated"
              value={movie.Rated}
            />

            <MovieDetailItem
              icon={<GlobalOutlined />}
              label="Language"
              value={movie.Language}
            />

            <MovieDetailItem
              icon={<ClockCircleOutlined />}
              label="Runtime"
              value={movie.Runtime}
            />
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}

export default MovieInfo;