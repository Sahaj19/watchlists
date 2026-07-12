import { Col, Row, Flex } from 'antd';

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
          lg={8}
          xl={6}
          xxl={4}
        >
          <Flex justify="center">
            <MovieCard movie={movie} />
          </Flex>
        </Col>
      ))}
    </Row>
  );
}

export default MovieGrid;