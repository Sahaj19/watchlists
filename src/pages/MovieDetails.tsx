import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Flex } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MovieDetailsSkeleton from '../components/common/MovieDetailsSkeleton';
import { getMovieDetails } from '../services/movie.service';

import type { MovieDetails as MovieDetailsType } from '../types/movie.types';
import EmptyState from '../components/common/EmptyState';

import MovieHero from '../components/movie/MovieHero';
import MovieRatings from '../components/movie/MovieRatings';
import MovieInfo from '../components/movie/MovieInfo';

function MovieDetails() {
  const navigate = useNavigate();
  const { imdbID } = useParams();

  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, [imdbID]);

  async function fetchMovie() {
    try {
      setLoading(true);
      setError(false);

      const response = await getMovieDetails(imdbID!);

      if (response.Response === 'True') {
        setMovie(response);
      } else {
        setMovie(null);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <MovieDetailsSkeleton />;
 }

  if (error) {
    return (
      <EmptyState description="Unable to load movie details." />
    );
  }

  if (!movie) {
    return (
      <EmptyState description="Movie not found." />
    );
  }

  return (
    <Flex
      vertical
      gap={32}
      style={{ maxWidth: 1180, margin: '0 auto', width: '100%', padding: '24px 0' }}
    >
      <Flex justify="start" wrap gap={16}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </Flex>

      <Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
        <MovieHero movie={movie} />
      </Card>

      <MovieRatings
        imdbRating={movie.imdbRating}
        metascore={movie.Metascore}
        ratings={movie.Ratings}
      />

      <MovieInfo movie={movie} />
    </Flex>
  );
}

export default MovieDetails;