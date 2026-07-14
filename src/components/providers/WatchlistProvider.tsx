import { useCallback, useEffect, useState, type ReactNode } from "react";
import { WatchlistContext } from "../../context/WatchlistContext";
import type { WatchlistMovie } from "../../types/movie.types";
import { useAuth } from "../../hooks/useAuth";
import { getWatchlist, addMovie as addMovieService, removeMovie as removeMovieService, toggleWatched as toggleWatchedService } from "../../services/watchlist.service";

interface WatchlistProviderProps {
  children: ReactNode;
}

function WatchlistProvider({ children }: WatchlistProviderProps) {
  const { currentUser } = useAuth();

  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);

  const loadWatchlist = useCallback(() => {
    setWatchlist(getWatchlist());
  }, []);

  useEffect(() => {
    loadWatchlist();
  }, [currentUser, loadWatchlist]);

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

  const value = {
    watchlist,
    loadWatchlist,
    addMovie,
    removeMovie,
    toggleWatched,
    isMovieInWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistProvider;