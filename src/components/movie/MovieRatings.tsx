import { Card, Col, Row, Typography } from 'antd';

import type { Rating } from '../../types/movie.types';

const { Title, Text } = Typography;

interface MovieRatingsProps {
  imdbRating: string;
  metascore: string;
  ratings: Rating[];
}

function MovieRatings({
  imdbRating,
  metascore,
  ratings,
}: MovieRatingsProps) {
  const rottenTomatoes = ratings.find(
    (rating) => rating.Source === 'Rotten Tomatoes'
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ textAlign: 'center' }}>
          <Title level={4}>{imdbRating}</Title>
          <Text>IMDb</Text>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card style={{ textAlign: 'center' }}>
          <Title level={4}>
            {rottenTomatoes?.Value ?? 'N/A'}
          </Title>

          <Text>Rotten Tomatoes</Text>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card style={{ textAlign: 'center' }}>
          <Title level={4}>{metascore}</Title>
          <Text>Metascore</Text>
        </Card>
      </Col>
    </Row>
  );
}

export default MovieRatings;