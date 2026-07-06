import { Card, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { MovieSummary } from "../../types/movie.types";
import Poster from "../common/Poster";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface MovieCardProps {
  movie: MovieSummary;
}

function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
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
    </Card>
  );
}

export default MovieCard;
