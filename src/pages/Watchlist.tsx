import { useEffect, useState } from 'react';
import { Flex, Modal, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import WatchlistMovieCard from '../components/watchlist/WatchlistMovieCard';

import { useWatchlist } from '../hooks/useWatchlist';

import { getMovieDetails } from '../services/movie.service';

import type {
  MovieDetails,
  MovieDetailsResponse,
} from '../types/movie.types';

const { Title } = Typography;

function Watchlist() {
  const navigate = useNavigate();

  const {
    watchlist,
    removeMovie,
    toggleWatched,
  } = useWatchlist();

  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    if (watchlist.length === 0) {
      return;
    }

    try {
      setLoading(true);

      const responses = await Promise.all(
        watchlist.map((movie) =>
          getMovieDetails(movie.imdbID)
        )
      );

      const validMovies = responses.filter(
        (
          movie
        ): movie is MovieDetails =>
          movie.Response === 'True'
      );

      setMovies(validMovies);
    } finally {
      setLoading(false);
    }
  }

  function handleViewDetails(movie: MovieDetails) {
    navigate(`/movie/${movie.imdbID}`);
  }

  function handleToggleWatched(movie: MovieDetails) {
    toggleWatched(movie.imdbID);
  }

  function handleRemove(movie: MovieDetails) {
    Modal.confirm({
      title: 'Remove from Watchlist',
      content: `Are you sure you want to remove "${movie.Title}" from your watchlist?`,
      okText: 'Remove',
      okButtonProps: {
        danger: true,
      },
      cancelText: 'Cancel',

      onOk() {
        removeMovie(movie.imdbID);

        setMovies((previousMovies) =>
          previousMovies.filter(
            (currentMovie) =>
              currentMovie.imdbID !== movie.imdbID
          )
        );
      },
    });
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <Flex
      vertical
      gap={24}
    >
      <Title level={2}>
        My Watchlist
      </Title>

      {movies.length === 0 ? (
        <EmptyState description="Your watchlist is empty." />
      ) : (
        <Flex
          wrap="wrap"
          gap={24}
        >
          {movies.map((movie) => {
            const watchlistMovie = watchlist.find(
              (item) => item.imdbID === movie.imdbID
            );

            return (
              <WatchlistMovieCard
                key={movie.imdbID}
                movie={movie}
                watched={watchlistMovie?.watched ?? false}
                onViewDetails={handleViewDetails}
                onToggleWatched={handleToggleWatched}
                onRemove={handleRemove}
              />
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}

export default Watchlist;