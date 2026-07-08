import { useEffect, useState } from 'react';
import { Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import WatchlistMovieCard from '../components/watchlist/WatchlistMovieCard';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import { useWatchlist } from '../hooks/useWatchlist';
import { getMovieDetails } from '../services/movie.service';
import type { MovieDetails } from '../types/movie.types';
import WatchlistFilters, { type WatchlistFiltersValue } from '../components/watchlist/WatchlistFilters';

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
  const [movieToRemove, setMovieToRemove] = useState<MovieDetails | null>(null);

  const [filteredMovies, setFilteredMovies] = useState<MovieDetails[]>([]);
  const [filters, setFilters] = useState<WatchlistFiltersValue>({
    search: '',
    status: 'all',
    genre: 'all',
    duration: 'all',
  });

  const genres = Array.from(
    new Set(
      movies.flatMap((movie) =>
        movie.Genre.split(', ').map((genre) => genre.trim())
      )
    )
  ).sort();

  useEffect(() => {
    if (watchlist.length > 0) {
      loadMovies();
    } else {
      setMovies([]);
      setFilteredMovies([]);
    }
  }, [watchlist]);

  async function loadMovies() {
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
      setFilteredMovies(validMovies);
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
    setMovieToRemove(movie);
  }

  function confirmRemoveMovie() {
    if (!movieToRemove) {
      return;
    }

    removeMovie(movieToRemove.imdbID);

    setMovies((previousMovies) =>
      previousMovies.filter(
        (movie) =>
          movie.imdbID !== movieToRemove.imdbID
      )
    );

    setFilteredMovies((previousMovies) =>
      previousMovies.filter(
        (movie) => movie.imdbID !== movieToRemove.imdbID
      )
    );

    setMovieToRemove(null);
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  // Apply filters to the watchlist movies`
  function handleApplyFilters() {
    let result = [...movies];

    // Search
    if (filters.search.trim()) {
      result = result.filter((movie) =>
        movie.Title.toLowerCase().includes(
          filters.search.toLowerCase()
        )
      );
    }

    // Status
    if (filters.status !== 'all') {
      result = result.filter((movie) => {
        const watchlistMovie = watchlist.find(
          (item) => item.imdbID === movie.imdbID
        );

        return filters.status === 'watched'
          ? watchlistMovie?.watched
          : !watchlistMovie?.watched;
      });
    }

    // Genre
    if (filters.genre !== 'all') {
      result = result.filter((movie) =>
        movie.Genre.split(', ')
          .map((genre) => genre.trim())
          .includes(filters.genre)
      );
    }

    // Duration
    if (filters.duration !== 'all') {
      result = result.filter((movie) => {
        const duration = Number(
          movie.Runtime.split(' ')[0]
        );

        switch (filters.duration) {
          case 'short':
            return duration < 90;

          case 'medium':
            return duration >= 90 && duration <= 120;

          case 'long':
            return duration > 120 && duration <= 150;

          case 'epic':
            return duration > 150;

          default:
            return true;
        }
      });
    }

    setFilteredMovies(result);
  }

  // Reset filters to default values`
  function handleResetFilters() {
    setFilters({
      search: '',
      status: 'all',
      genre: 'all',
      duration: 'all',
    });

    setFilteredMovies(movies);
  }

  return (
    <>
    <Flex
      vertical
      gap={24}
    >
      <Title level={2}>
        My Watchlist
      </Title>

      <WatchlistFilters
        value={filters}
        genres={genres}
        onChange={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {filteredMovies.length === 0 ? (
        <EmptyState
          description={
            movies.length === 0
              ? 'Your watchlist is empty.'
              : 'No movies match the selected filters.'
          }
        />
      ) : (
        <Flex
          wrap="wrap"
          gap={24}
        >
          {filteredMovies.map((movie) => {
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

    {/* Remove from Watchlist Confirmation */}
    <ConfirmationDialog
      open={Boolean(movieToRemove)}
      title="Remove Movie"
      content={`Are you sure you want to remove "${movieToRemove?.Title}" from your watchlist?`}
      confirmText="Yes, Remove"
      danger
      onConfirm={confirmRemoveMovie}
      onCancel={() => setMovieToRemove(null)}
    />
    </>
  );
}

export default Watchlist;