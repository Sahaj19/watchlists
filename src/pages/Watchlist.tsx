import { useEffect, useState, useCallback } from "react";
import { Flex, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import EmptyState from "../components/common/EmptyState";
import WatchlistMovieCard from "../components/watchlist/WatchlistMovieCard";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import { useWatchlist } from "../hooks/useWatchlist";
import { getMovieDetails } from "../services/movie.service";
import type { MovieDetails } from "../types/movie.types";
import WatchlistFilters, { type WatchlistFiltersValue } from "../components/watchlist/WatchlistFilters";
import { notificationService } from "../services/notification.service";
import { applyWatchlistFilters } from "../utils/watchlistFiltersLogic";
import ErrorState from "../components/common/ErrorState";
import PageBanner from "../components/common/PageBanner";

function Watchlist() {
  usePageTitle("Watchlists | My Watchlist");
  const navigate = useNavigate();
  const { watchlist, removeMovie, toggleWatched } = useWatchlist();
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState<MovieDetails | null>(null);

  const [filteredMovies, setFilteredMovies] = useState<MovieDetails[]>([]);
  const [filters, setFilters] = useState<WatchlistFiltersValue>({
    search: "",
    status: "all",
    genre: "all",
    duration: "all",
  });

  const [appliedFilters, setAppliedFilters] = useState<WatchlistFiltersValue>({
    search: "",
    status: "all",
    genre: "all",
    duration: "all",
  });

  const genres = Array.from(
    new Set(
      movies.flatMap((movie) =>
        movie.Genre.split(", ").map((genre) => genre.trim()),
      ),
    ),
  ).sort();

  // UseEffect-2 (responsible for applying filters when the filters change)
  useEffect(() => {
    setFilteredMovies(
      applyWatchlistFilters({
        movies,
        watchlist,
        filters: appliedFilters,
      }),
    );
  }, [movies, watchlist, appliedFilters]);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const responses = await Promise.all(watchlist.map((movie) => getMovieDetails(movie.imdbID)));
      const validMovies = responses.filter((movie): movie is MovieDetails => movie.Response === "True");

      setMovies(validMovies);
    } catch {
      setError(true);
      notificationService.error("Unable to Load Watchlist", "Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [watchlist]);

  // UseEffect-1 (responsible for loading the watchlist movies when the watchlist changes)
  useEffect(() => {
    if (watchlist.length > 0) {
      loadMovies();
    } else {
      setMovies([]);
      setFilteredMovies([]);
    }
  }, [watchlist.length, loadMovies]);

  function handleViewDetails(movie: MovieDetails) {
    navigate(`/movie/${movie.imdbID}`);
  }

  function handleToggleWatched(movie: MovieDetails) {
    const watchlistMovie = watchlist.find(
      (item) => item.imdbID === movie.imdbID,
    );

    toggleWatched(movie.imdbID);

    if (watchlistMovie?.watched) {
      notificationService.info("Marked as Unwatched", `"${movie.Title}" has been marked as unwatched.`);
    } else {
      notificationService.success("Marked as Watched", `"${movie.Title}" has been marked as watched.`);
    }
  }

  function handleRemove(movie: MovieDetails) {
    setMovieToRemove(movie);
  }

  function confirmRemoveMovie() {
    if (!movieToRemove) {
      return;
    }

    const updatedMovies = movies.filter((movie) => movie.imdbID !== movieToRemove.imdbID);

    setMovies(updatedMovies);

    removeMovie(movieToRemove.imdbID);

    notificationService.success("Movie Removed",`"${movieToRemove.Title}" has been removed from your watchlist.`);

    setMovieToRemove(null);
  }

  // Apply filters to the watchlist movies`
  function handleApplyFilters() {
    setAppliedFilters(filters);
  }

  // Reset filters to default values`
  function handleResetFilters() {
    const defaultFilters: WatchlistFiltersValue = {
      search: "",
      status: "all",
      genre: "all",
      duration: "all",
    };

    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to Load Watchlist"
        description="Something went wrong while loading your watchlist."
        onRetry={loadMovies}
      />
    );
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Flex vertical gap={24}>
        <PageBanner
          title="Your Personal"
          highlightedTitle="Watchlist"
          description="All the movies you've saved in one place. Keep track of what you want to watch and manage your collection anytime."
        />

        <WatchlistFilters
          value={filters}
          genres={genres}
          onChange={setFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        {filteredMovies.length === 0 ? (
          <EmptyState
            description={movies.length === 0 ? "Your watchlist is empty." : "No movies match the selected filters."}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {filteredMovies.map((movie) => {
              const watchlistMovie = watchlist.find((item) => item.imdbID === movie.imdbID);

              return (
                <Col key={movie.imdbID} xs={24} sm={12} md={8} lg={6}>
                  <WatchlistMovieCard
                    movie={movie}
                    watched={watchlistMovie?.watched ?? false}
                    onViewDetails={handleViewDetails}
                    onToggleWatched={handleToggleWatched}
                    onRemove={handleRemove}
                  />
                </Col>
              );
            })}
          </Row>
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
