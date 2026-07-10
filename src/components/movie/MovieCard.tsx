import { useState } from "react";
import { Button, Card, Flex, Typography } from 'antd';
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import type { MovieSummary } from "../../types/movie.types";
import Poster from "../common/Poster";
import ConfirmationDialog from '../common/ConfirmationDialog';
import { notificationService } from '../../services/notification.service';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { useWatchlist } from '../../hooks/useWatchlist';

const { Text } = Typography;

interface MovieCardProps {
  movie: MovieSummary;
}

function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const { addMovie, isMovieInWatchlist, removeMovie } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const isSaved = isMovieInWatchlist(movie.imdbID);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  // add movie handler
  function handleAddMovie(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    addMovie(movie.imdbID);
    notificationService.success('Movie Added', `"${movie.Title}" has been added to your watchlist.`);
  }

  // remove movie handler
  function handleRemoveMovie() {
    removeMovie(movie.imdbID);
    setShowRemoveConfirmation(false);
    notificationService.success('Movie Removed', `"${movie.Title}" has been removed from your watchlist.`);
  }

  return (
    <>
    <Card
      hoverable
      cover={<Poster src={movie.Poster} alt={movie.Title} />}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <Text strong ellipsis>
        {movie.Title}
      </Text>

      <br />

      <Text type="secondary">{movie.Year}</Text>
      
      <Flex
        vertical
        gap={12}
        style={{
          marginTop: 16,
        }}
      >
        <Button
          block
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/movie/${movie.imdbID}`);
          }}
        >
          View Details
        </Button>

        {isAuthenticated && (
          isSaved ? (
            <Button
              block
              icon={<CheckOutlined />}
              onClick={(event) => {
                event.stopPropagation();
                setShowRemoveConfirmation(true);
              }}
            >
              Saved
            </Button>
          ) : (
            <Button
              type="primary"
              block
              icon={<PlusOutlined />}
              onClick={handleAddMovie}
            >
              Add to Watchlist
            </Button>
          )
        )}
      </Flex>
    </Card>

    {/* Remove from Watchlist Confirmation */}
    <ConfirmationDialog
      open={showRemoveConfirmation}
      title="Remove Movie"
      content={`Are you sure you want to remove "${movie.Title}" from your watchlist?`}
      confirmText="Yes, Remove"
      danger
      onConfirm={handleRemoveMovie}
      onCancel={() => setShowRemoveConfirmation(false)}
    />
    </>
  );
}

export default MovieCard;
