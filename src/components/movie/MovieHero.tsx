import { useState } from "react";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useWatchlist } from "../../hooks/useWatchlist";
import { Button, Flex, Grid, Tag, Typography, Card } from "antd";
import { CopyOutlined, ExportOutlined, HeartOutlined, TagsOutlined, DeleteOutlined, ArrowDownOutlined } from "@ant-design/icons";
import Poster from "../common/Poster";
import { notificationService } from "../../services/notification.service";
import type { MovieDetails } from "../../types/movie.types";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface MovieHeroProps {
  movie: MovieDetails;
  onReadMore: () => void;
}

function MovieHero({ movie, onReadMore }: MovieHeroProps) {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();
  const screens = useBreakpoint();
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const { addMovie, removeMovie, isMovieInWatchlist } = useWatchlist();
  const isSaved = isMovieInWatchlist(movie.imdbID);

  // add movie handler
  function handleAddMovie() {
    addMovie(movie.imdbID);
    notificationService.success("Movie Added", `"${movie.Title}" has been added to your watchlist.`);
  }

  // remove movie handler
  function handleRemoveMovie() {
    removeMovie(movie.imdbID);
    setShowRemoveConfirmation(false);
    notificationService.success("Movie Removed", `"${movie.Title}" has been removed from your watchlist.`);
  }

  async function handleShare() {
    const url = `https://www.imdb.com/title/${movie.imdbID}`;

    try {
      await navigator.clipboard.writeText(url);
      notificationService.success("Link Copied", "IMDb link copied to clipboard.");
    } catch {
      notificationService.error("Unable to Copy", "Please try again.");
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
        <Poster src={movie.Poster} alt={movie.Title} width={260} height={380} />

        <Flex vertical style={{ flex: 1, minHeight: 380, width: "100%" }}>
          {/* Title */}
          <Title level={2} style={{ marginTop: 0, marginBottom: 24, textAlign: screens.md ? "left" : "center" }}>{movie.Title}</Title>

          {/* Genres */}
          <Flex wrap gap={8} style={{ marginBottom: 24 }} justify={screens.md ? "flex-start" : "center"}>
            {movie.Genre.split(", ").map((genre) => (
              <Tag key={genre} icon={<TagsOutlined />}>
                {genre}
              </Tag>
            ))}
          </Flex>

          {/* Plot */}
          {movie.Plot !== "N/A" && (
            <Card
              size="small"
              style={{ flex: 1, borderColor: colors.border, marginBottom: 24 }}
              styles={{
                body: {
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                },
              }}
            >
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }} ellipsis={{ rows: 3 }}>{movie.Plot}</Paragraph>

              <Button
                type="text"
                icon={<ArrowDownOutlined />}
                onClick={onReadMore}
                style={{ width: "fit-content", paddingInline: 2, color: colors.primary, fontWeight: 600 }}
              >
                Continue Reading
              </Button>
            </Card>
          )}

          {/* Actions */}
          <Flex wrap gap={12} justify={screens.md ? "flex-start" : "center"}>
            {isAuthenticated &&
              (isSaved ? (
                <Button danger icon={<DeleteOutlined />} onClick={() => setShowRemoveConfirmation(true)}>Remove from Watchlist</Button>
              ) : (
                <Button type="primary" icon={<HeartOutlined />} onClick={handleAddMovie}>Save to Watchlist</Button>
            ))}
            <Button
              icon={<ExportOutlined />}
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
            >
              View on IMDb
            </Button>

            <Button icon={<CopyOutlined />} onClick={handleShare}>Copy URL</Button>
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
