import { Card, Descriptions, Typography } from 'antd';

import type { MovieDetails } from '../../types/movie.types';

const { Paragraph } = Typography;

interface MovieInfoProps {
  movie: MovieDetails;
}

function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <Card title="Movie Information">
      <Descriptions
        column={{ xs: 1, sm: 2 }}
        bordered
        size="middle"
      >
        <Descriptions.Item label="Plot" span={2}>
          <Paragraph>{movie.Plot}</Paragraph>
        </Descriptions.Item>

        <Descriptions.Item label="Director">
          {movie.Director}
        </Descriptions.Item>

        <Descriptions.Item label="Actors">
          {movie.Actors}
        </Descriptions.Item>

        <Descriptions.Item label="Awards">
          {movie.Awards}
        </Descriptions.Item>

        <Descriptions.Item label="Released">
          {movie.Released}
        </Descriptions.Item>

        <Descriptions.Item label="Rated">
          {movie.Rated}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

export default MovieInfo;