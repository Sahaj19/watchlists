import { Button, Flex, Tag, Typography } from 'antd';

import Poster from '../common/Poster';

import type { MovieDetails } from '../../types/movie.types';

const { Title, Text } = Typography;

interface MovieHeroProps {
  movie: MovieDetails;
}

function MovieHero({ movie }: MovieHeroProps) {
  return (
    <Flex wrap gap={32} style={{ width: '100%', padding: 32 }}>
      <Poster
        src={movie.Poster}
        alt={movie.Title}
        height={500}
      />

      <Flex vertical gap={16} style={{ minWidth: 0, flex: 1 }}>
        <Title level={2}>{movie.Title}</Title>

        <Flex wrap gap={8}>
          {movie.Genre.split(', ').map((genre) => (
            <Tag key={genre}>{genre}</Tag>
          ))}
        </Flex>

        <Text type="secondary">
          {movie.Rated} • {movie.Runtime} • {movie.Year}
        </Text>

        <Flex wrap gap={12} style={{ marginTop: 16 }}>
          <Button type="primary">
            Add to Watchlist
          </Button>

          <Button
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
          >
            View on IMDb
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default MovieHero;