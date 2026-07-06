import { Col, Row } from 'antd';

import MovieCard from './MovieCard';

import type { MovieSummary } from '../../types/movie.types';

interface MovieGridProps {
  movies: MovieSummary[];
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <Row gutter={[24, 24]}>
      {movies.map((movie) => (
        <Col
          key={movie.imdbID}
          xs={24}
          sm={12}
          md={8}
          lg={6}
        >
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}

export default MovieGrid;