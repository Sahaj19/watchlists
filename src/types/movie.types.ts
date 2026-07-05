/**
 * ============================================================================
 * OMDb API - Movie Types
 * ============================================================================
 * This file contains all TypeScript types related to the OMDb API and the
 * application's movie data.
 *
 * NOTE:
 * The OMDb API field names (Title, Year, Poster, etc.) are intentionally kept
 * exactly as returned by the API. This avoids unnecessary mapping and keeps the
 * application simple.
 * ============================================================================
 */


// Allowed movie types returned by the OMDb API.
export type MovieType = 'movie' | 'series';

// Movie ratings from different platforms (This is part of the MovieDetails interface)
export interface Rating {
  Source: string;
  Value: string;
}

// A lightweight array of movie summaries returned by the Search API.
export interface MovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
}

// Successful Search API response.
export interface MovieSearchResult {
  Search: MovieSummary[];
  totalResults: string;
  Response: 'True';
}

/**
 * Failed Search API response.
 *
 * Example:
 * {
 *   Response: "False",
 *   Error: "Movie not found!"
 * }
 */
export interface MovieSearchError {
  Response: 'False';
  Error: string;
}

/**
 * Complete Search API response.
 */
export type MovieSearchResponse = MovieSearchResult | MovieSearchError;

/**
 * Complete movie information returned by the Details API.
 *
 * Endpoint:
 * ?i=tt10366206&plot=full
 */
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: MovieType;
  totalSeasons?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: 'True';
}

/**
 * Failed Movie Details API response.
 *
 * Example:
 * {
 *   Response: "False",
 *   Error: "Incorrect IMDb ID."
 * }
 */
export interface MovieDetailsError {
  Response: 'False';
  Error: string;
}

// Complete Movie Details API response.
export type MovieDetailsResponse = MovieDetails | MovieDetailsError;

/**
 * Application-specific movie model stored in the user's watchlist.
 *
 * This is NOT returned by the OMDb API.
 *
 * We only store the IMDb ID because all other movie information
 * can always be fetched from the OMDb API.
 */
export interface WatchlistMovie {
  imdbID: string;
  watched: boolean;
}