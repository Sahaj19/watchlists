import { useState } from "react";
import { Badge, Card, Space, Tooltip, Typography } from "antd";
import {
  PlusOutlined,
  CheckCircleFilled,
  EyeOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { MovieSummary } from "../../types/movie.types";
import Poster from "../common/Poster";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { notificationService } from "../../services/notification.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useWatchlist } from "../../hooks/useWatchlist";
import { useTheme } from "../../hooks/useTheme";

const { Text } = Typography;

interface MovieCardProps {
  movie: MovieSummary;
}

function MovieCard({ movie }: MovieCardProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { addMovie, isMovieInWatchlist, removeMovie } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const isSaved = isMovieInWatchlist(movie.imdbID);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  // add movie handler
  function handleAddMovie(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    addMovie(movie.imdbID);
    notificationService.success(
      "Movie Added",
      `"${movie.Title}" has been added to your watchlist.`,
    );
  }

  // remove movie handler
  function handleRemoveMovie() {
    removeMovie(movie.imdbID);
    setShowRemoveConfirmation(false);
    notificationService.success(
      "Movie Removed",
      `"${movie.Title}" has been removed from your watchlist.`,
    );
  }

  const cardActions = [
    <Tooltip title="View Details" key="view">
      <EyeOutlined
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/movie/${movie.imdbID}`);
        }}
      />
    </Tooltip>,
  ];

  if (isAuthenticated) {
    cardActions.push(
      isSaved ? (
        <Tooltip title="Remove from Watchlist" key="remove">
          <DeleteOutlined
            onClick={(event) => {
              event.stopPropagation();
              setShowRemoveConfirmation(true);
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Add to Watchlist" key="add">
          <PlusOutlined onClick={handleAddMovie} />
        </Tooltip>
      ),
    );
  }

  const cover = <Poster src={movie.Poster} alt={movie.Title} />;

  return (
    <>
      <Card
        hoverable
        style={{ width: 290 }}
        cover={
          isSaved ? (
            <Badge.Ribbon
              text={
                <>
                  <CheckCircleFilled /> Saved
                </>
              }
              color={colors.green}
            >
              {cover}
            </Badge.Ribbon>
          ) : (
            cover
          )
        }
        actions={cardActions}
        onClick={() => navigate(`/movie/${movie.imdbID}`)}
      >
        <Card.Meta
          title={<Text ellipsis title={movie.Title}>{movie.Title}</Text>}
          description={
            <Space size={4}>
              <CalendarOutlined />
              {movie.Year}
            </Space>
          }
        />
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
