import {
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import {
  Button,
  Card,
  Flex,
  Typography,
} from 'antd';

import type { MovieDetails } from '../../types/movie.types';
import Poster from '../common/Poster';

const { Title, Text } = Typography;

interface WatchlistMovieCardProps {
  movie: MovieDetails;
  watched: boolean;

  onViewDetails: (movie: MovieDetails) => void;
  onToggleWatched: (movie: MovieDetails) => void;
  onRemove: (movie: MovieDetails) => void;
}

function WatchlistMovieCard({
  movie,
  watched,
  onViewDetails,
  onToggleWatched,
  onRemove,
}: WatchlistMovieCardProps) {
  return (
    <Card
      hoverable
      cover={<Poster src={movie.Poster} alt={movie.Title} />}
      onClick={() => onViewDetails(movie)}
    >
      <Flex
        vertical
        gap={16}
      >
        <Flex
          vertical
          gap={4}
        >
          <Title
            level={5}
            style={{
              margin: 0,
            }}
          >
            {movie.Title}
          </Title>

          <Text type="secondary">
            {movie.Year}
          </Text>

          <Text
            type="secondary"
            style={{
              fontSize: 13,
            }}
          >
          {movie.Genre.replaceAll(',', ' •')}
          </Text>
        </Flex>

        <Button
          block
          onClick={() => onViewDetails(movie)}
        >
          View Details
        </Button>

        <Button
          block
          type={watched ? 'primary' : 'default'}
          icon={<CheckOutlined />}
          onClick={(event) => {
            event.stopPropagation();
            onToggleWatched(movie);
        }}
        >
          {watched
            ? 'Watched'
            : 'Mark as Watched'}
        </Button>

        <Button
          danger
          block
          icon={<DeleteOutlined />}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(movie);
        }}
        >
          Remove
        </Button>
      </Flex>
    </Card>
  );
}

export default WatchlistMovieCard;