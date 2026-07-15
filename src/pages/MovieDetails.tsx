import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import usePageTitle from "../hooks/usePageTitle";
import MovieDetailsSkeleton from "../components/common/MovieDetailsSkeleton";
import { getMovieDetails } from "../services/movie.service";
import type { MovieDetails as MovieDetailsType } from "../types/movie.types";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import { notificationService } from "../services/notification.service";
import MovieHero from "../components/movie/MovieHero";
import MovieRatings from "../components/movie/MovieRatings";
import MovieInfo from "../components/movie/MovieInfo";
import MovieAwards from "../components/movie/MovieAwards";

function MovieDetails() {
  const movieInfoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  usePageTitle(movie ? `Watchlists | ${movie.Title}` : "Watchlists | Movie Details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await getMovieDetails(imdbID!);

      if (response.Response === "True") {
        setMovie(response);
      } else {
        setMovie(null);
      }
    } catch {
      setMovie(null);
      setError(true);
      notificationService.error(
        "Unable to Load Movie",
        "Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  }, [imdbID]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  function handleReadMore() {
    movieInfoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to Load Movie"
        description="Please try again later."
        onRetry={fetchMovie}
      />
    );
  }

  if (!movie) {
    return <EmptyState description="Movie not found." />;
  }

  return (
    <Flex vertical gap={32} style={{ maxWidth: 1180, margin: "0 auto", width: "100%", padding: "24px 10px" }}>
      <Flex justify="start" wrap gap={16}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>Back</Button>
      </Flex>

      <Card style={{ width: "100%" }} styles={{ body: { padding: 0 } }}>
        <MovieHero movie={movie} onReadMore={handleReadMore} />
      </Card>

      <MovieRatings
        imdbRating={movie.imdbRating}
        metascore={movie.Metascore}
        ratings={movie.Ratings}
      />

      <MovieAwards awards={movie.Awards} />

      <Flex ref={movieInfoRef}>
        <MovieInfo movie={movie} />
      </Flex>
    </Flex>
  );
}

export default MovieDetails;
