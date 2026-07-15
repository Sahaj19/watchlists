import type { MovieDetails, WatchlistMovie } from '../types/movie.types';
import type { WatchlistFiltersValue } from '../components/watchlist/WatchlistFilters';

interface ApplyWatchlistFiltersParams {
  movies: MovieDetails[];
  watchlist: WatchlistMovie[];
  filters: WatchlistFiltersValue;
}

export function applyWatchlistFilters({ movies, watchlist, filters }: ApplyWatchlistFiltersParams): MovieDetails[] {
  let result = [...movies];

  // Search
  if (filters.search.trim()) {
    result = result.filter((movie) =>
      movie.Title.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  // Status
  if (filters.status !== 'all') {
    result = result.filter((movie) => {
      const watchlistMovie = watchlist.find((item) => item.imdbID === movie.imdbID);
      return filters.status === 'watched' ? watchlistMovie?.watched : !watchlistMovie?.watched;
    });
  }

  // Genre
  if (filters.genre !== 'all') {
    result = result.filter((movie) =>
      movie.Genre.split(', ').map((genre) => genre.trim()).includes(filters.genre)
    );
  }

  // Duration
  if (filters.duration !== 'all') {
    result = result.filter((movie) => {
      const duration = Number(movie.Runtime.split(' ')[0]);

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

  return result;
}