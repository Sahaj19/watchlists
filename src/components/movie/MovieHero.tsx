import { useState } from "react";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useWatchlist } from "../../hooks/useWatchlist";
import { Button, Flex, Grid, Tag, Typography } from "antd";
import {
  HeartOutlined,
  LinkOutlined,
  ShareAltOutlined,
  TagsOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Poster from "../common/Poster";
import { notificationService } from "../../services/notification.service";
import type { MovieDetails } from "../../types/movie.types";

const { Title } = Typography;
const { useBreakpoint } = Grid;

interface MovieHeroProps {
  movie: MovieDetails;
}

function MovieHero({ movie }: MovieHeroProps) {
  const screens = useBreakpoint();
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const { addMovie, removeMovie, isMovieInWatchlist } = useWatchlist();
  const isSaved = isMovieInWatchlist(movie.imdbID);

  // add movie handler
  function handleAddMovie() {
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

  async function handleShare() {
  const url = `https://www.imdb.com/title/${movie.imdbID}`;

  try {
    await navigator.clipboard.writeText(url);

    notificationService.success(
      "Link Copied",
      "IMDb link copied to clipboard."
    );
  } catch {
    notificationService.error(
      "Unable to Copy",
      "Please try again."
    );
  }
}

  return (
    <>
      <Flex
        vertical={!screens.md}
        gap={32}
        align={screens.md ? "flex-start" : "center"}
        style={{ width: "100%", padding: screens.md ? 32 : 16 }}
      >
        <Poster src={movie.Poster} alt={movie.Title} />

        <Flex
          vertical
          justify="center"
          gap={20}
          style={{
            minWidth: 280,
            flex: 1,
            width: "100%",
            textAlign: screens.md ? "left" : "center",
          }}
        >
          <Title level={2}>{movie.Title}</Title>

          <Flex
            wrap
            gap={8}
            justify={screens.md ? "flex-start" : "center"}
          >
            {movie.Genre.split(", ").map((genre) => (
              <Tag key={genre} icon={<TagsOutlined />}>
                {genre}
              </Tag>
            ))}
          </Flex>

          <Flex
            wrap
            gap={12}
            justify={screens.md ? "flex-start" : "center"}
          >
            {isSaved ? (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => setShowRemoveConfirmation(true)}
              >
                Remove from Watchlist
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<HeartOutlined />}
                onClick={handleAddMovie}
              >
                Save to Watchlist
              </Button>
            )}

            <Button
              icon={<LinkOutlined />}
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
            >
              IMDb
            </Button>

            <Button
              icon={<ShareAltOutlined />}
              onClick={handleShare}
            >
              Share
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <ConfirmationDialog
        open={showRemoveConfirmation}
        title="Remove from Watchlist"
        content={`Are you sure you want to remove "${movie.Title}" from your watchlist?`}
        confirmText="Yes, Remove"
        danger
        onConfirm={handleRemoveMovie}
        onCancel={() => setShowRemoveConfirmation(false)}
      />
    </>
  );
}

export default MovieHero;
