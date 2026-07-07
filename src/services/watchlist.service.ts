import type { WatchlistMovie } from '../types/movie.types';
import { getCurrentUser, updateUser } from './auth.service';

// Returns the current user's watchlist.
export function getWatchlist(): WatchlistMovie[] {
  const user = getCurrentUser();

  return user?.watchlist ?? [];
}

// Returns true if the movie is already in the watchlist.
export function isMovieInWatchlist(imdbID: string): boolean {
  return getWatchlist().some(
    (movie) => movie.imdbID === imdbID
  );
}

// Adds a movie to the watchlist.
export function addMovie(imdbID: string): boolean {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  if (isMovieInWatchlist(imdbID)) {
    return false;
  }

  user.watchlist.push({
    imdbID,
    watched: false,
  });

  updateUser(user);

  return true;
}

// Removes a movie from the watchlist.
export function removeMovie(imdbID: string): boolean {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  user.watchlist = user.watchlist.filter(
    (movie) => movie.imdbID !== imdbID
  );

  updateUser(user);

  return true;
}

// Marks a movie as watched/unwatched.
export function toggleWatched(imdbID: string): boolean {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  const movie = user.watchlist.find(
    (movie) => movie.imdbID === imdbID
  );

  if (!movie) {
    return false;
  }

  movie.watched = !movie.watched;

  updateUser(user);

  return true;
}