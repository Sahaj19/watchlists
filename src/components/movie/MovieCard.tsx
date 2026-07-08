import { useState } from "react";
import { Button, Card, Flex, Modal, Typography } from 'antd';
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import type { MovieSummary } from "../../types/movie.types";
import Poster from "../common/Poster";
import ConfirmationDialog from '../common/ConfirmationDialog';
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
  }

  // remove movie handler
  function handleRemoveMovie() {
    removeMovie(movie.imdbID);
    setShowRemoveConfirmation(false);
  }

  return (
    <>
    <Card
      hoverable
      cover={<Poster src={movie.Poster} alt={movie.Title} />}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      actions={[
        <PlusOutlined
          key="add"
          onClick={(event) => {
            event.stopPropagation();
            // Add to Watchlist (later)
          }}
        />,
      ]}
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
