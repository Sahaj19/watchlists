import { createContext, useEffect, useState, type ReactNode } from "react";
import type { WatchlistMovie } from "../types/movie.types";
import { useAuth } from "../hooks/useAuth";
import {
  getWatchlist,
  addMovie as addMovieService,
  removeMovie as removeMovieService,
  toggleWatched as toggleWatchedService,
} from "../services/watchlist.service";

export interface WatchlistContextType {
  watchlist: WatchlistMovie[];
  loadWatchlist: () => void;
  addMovie: (imdbID: string) => boolean;
  removeMovie: (imdbID: string) => boolean;
  toggleWatched: (imdbID: string) => boolean;
  isMovieInWatchlist: (imdbID: string) => boolean;
}

export const WatchlistContext = createContext<WatchlistContextType | null>(
  null,
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export function WatchlistProvider({ children }: WatchlistProviderProps) {
  const { currentUser } = useAuth();

  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);

  function loadWatchlist() {
    setWatchlist(getWatchlist());
  }

  useEffect(() => {
    loadWatchlist();
  }, [currentUser]);

  function addMovie(imdbID: string) {
    const added = addMovieService(imdbID);

    if (added) {
      loadWatchlist();
    }

    return added;
  }

  function removeMovie(imdbID: string) {
    const removed = removeMovieService(imdbID);

    if (removed) {
      loadWatchlist();
    }

    return removed;
  }

  function toggleWatched(imdbID: string) {
    const updated = toggleWatchedService(imdbID);

    if (updated) {
      loadWatchlist();
    }

    return updated;
  }

  function isMovieInWatchlist(imdbID: string) {
    return watchlist.some((movie) => movie.imdbID === imdbID);
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        loadWatchlist,
        addMovie,
        removeMovie,
        toggleWatched,
        isMovieInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
