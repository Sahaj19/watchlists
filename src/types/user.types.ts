import type { WatchlistMovie } from './movie.types';

export interface User {
  email: string;
  watchlist: WatchlistMovie[];
}