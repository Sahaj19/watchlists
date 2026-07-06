import type { MovieDetailsResponse, MovieSearchResponse } from '../types/movie.types';
import { BASE_URL, API_KEY } from '../utils/api';

/**
 * Searches movies by title.
 *
 * Example:
 * searchMovies('batman')
 */
export async function searchMovies(searchTerm: string, page: number = 1): Promise<MovieSearchResponse> {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`);

  if (!response.ok) {
    throw new Error('Failed to fetch movies.');
  }

  return response.json();
}

/**
 * Fetches complete movie details.
 *
 * Example:
 * getMovieDetails('tt0372784')
 */
export async function getMovieDetails(imdbID: string): Promise<MovieDetailsResponse> {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);

  if (!response.ok) {
    throw new Error('Failed to fetch movie details.');
  }

  return response.json();
}