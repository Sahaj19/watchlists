import { useState } from 'react';
import ConfirmationDialog from '../common/ConfirmationDialog';
import { useWatchlist } from '../../hooks/useWatchlist';
import { Button, Flex, Tag, Typography } from 'antd';
import Poster from '../common/Poster';
import type { MovieDetails } from '../../types/movie.types';

const { Title, Text } = Typography;

interface MovieHeroProps {
  movie: MovieDetails;
}

function MovieHero({ movie }: MovieHeroProps) {
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const { addMovie, removeMovie, isMovieInWatchlist } = useWatchlist();
  const isSaved = isMovieInWatchlist(movie.imdbID);

  // add movie handler
  function handleAddMovie() {
    addMovie(movie.imdbID);
  }

  // remove movie handler
  function handleRemoveMovie() {
    removeMovie(movie.imdbID);
    setShowRemoveConfirmation(false);
  }

  return (
    <>
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
          {isSaved ? (
            <Button
              onClick={() => setShowRemoveConfirmation(true)}
            >
              Saved
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleAddMovie}
            >
              Add to Watchlist
            </Button>
          )}

          <Button
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
          >
            View on IMDb
          </Button>
        </Flex>
      </Flex>
    </Flex>

    <ConfirmationDialog
      open={showRemoveConfirmation}
      title="Remove from Watchlist"
      content={`Are you sure you want to remove "${movie.Title}" from your watchlist?`}
      confirmText="Yes, Remove"
      danger
      onConfirm={handleRemoveMovie}
      onCancel={() => setShowRemoveConfirmation(false)}
    />
    </>
  );
}

export default MovieHero;