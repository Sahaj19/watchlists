import { Button, Card, Flex, Modal, Typography } from 'antd';
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import type { MovieSummary } from "../../types/movie.types";
import Poster from "../common/Poster";
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

  // add movie handler
  function handleAddMovie(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    addMovie(movie.imdbID);
  }

  // remove movie handler
  function handleRemoveMovie(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    Modal.confirm({
      title: 'Remove Movie',
      content: `Are you sure you want to remove "${movie.Title}" from your watchlist?`,
      okText: 'Remove',
      okButtonProps: {
        danger: true,
      },
      cancelText: 'Cancel',
      onOk() {
        removeMovie(movie.imdbID);
      },
    });
  }

  return (
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
              onClick={handleRemoveMovie}
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
  );
}

export default MovieCard;
