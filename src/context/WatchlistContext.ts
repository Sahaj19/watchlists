import { createContext } from "react";
import type { WatchlistMovie } from "../types/movie.types";

export interface WatchlistContextType {
  watchlist: WatchlistMovie[];
  loadWatchlist: () => void;
  addMovie: (imdbID: string) => boolean;
  removeMovie: (imdbID: string) => boolean;
  toggleWatched: (imdbID: string) => boolean;
  isMovieInWatchlist: (imdbID: string) => boolean;
}

export const WatchlistContext = createContext<WatchlistContextType | null>(null);