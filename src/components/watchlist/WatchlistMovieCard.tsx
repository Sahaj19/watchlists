import {
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import {
  Button,
  Card,
  Flex,
  Tag,
  Typography,
} from 'antd';

import type { MovieDetails } from '../../types/movie.types';

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
      cover={
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : '/placeholder.png'
          }
          alt={movie.Title}
          style={{
            height: 420,
            objectFit: 'cover',
          }}
        />
      }
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

          <Tag
            style={{
              width: 'fit-content',
            }}
          >
            {movie.Genre.split(',')[0].trim()}
          </Tag>
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