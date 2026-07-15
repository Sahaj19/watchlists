import { CheckOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Badge, Card, Flex, Tag, Tooltip, Typography } from 'antd';
import type { MovieDetails } from '../../types/movie.types';
import Poster from '../common/Poster';
import { useTheme } from '../../hooks/useTheme';

const { Title, Text } = Typography;

interface WatchlistMovieCardProps {
  movie: MovieDetails;
  watched: boolean;
  onViewDetails: (movie: MovieDetails) => void;
  onToggleWatched: (movie: MovieDetails) => void;
  onRemove: (movie: MovieDetails) => void;
}

function WatchlistMovieCard({ movie, watched, onViewDetails, onToggleWatched, onRemove }: WatchlistMovieCardProps) {
  const { colors } = useTheme();
  const cover = <Poster src={movie.Poster} alt={movie.Title} />;

  return (
    <Card
      hoverable
      style={{ width: 290, borderRadius: 8 }}
      cover={
        watched ? (
          <Badge.Ribbon text="Watched" color={colors.green}>{cover}</Badge.Ribbon>
        ) : (
          cover
        )
      }
      onClick={() => onViewDetails(movie)}
      actions={[
        <Tooltip title="View details" key="view">
          <EyeOutlined onClick={() => onViewDetails(movie)} />
        </Tooltip>,
        <Tooltip title={watched ? 'Mark as unwatched' : 'Mark as watched'} key="watch">
          <CheckOutlined
            style={watched ? { color: colors.green } : undefined}
            onClick={(event) => {
              event.stopPropagation();
              onToggleWatched(movie);
            }}
          />
        </Tooltip>,
        <Tooltip title="Remove" key="remove">
          <DeleteOutlined
            style={{ color: colors.primary }}
            onClick={(event) => {
              event.stopPropagation();
              onRemove(movie);
            }}
          />
        </Tooltip>,
      ]}
    >
      <Card.Meta
        title={
          <Title level={5} title={movie.Title} style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {movie.Title}
          </Title>
        }
        description={
          <Flex vertical gap={8}>
            <Text type="secondary">{movie.Year}</Text>

            <Flex gap={4} wrap>
              {movie.Genre.split(',').map((genre) => (
                <Tag key={genre} style={{ margin: 0 }}>
                  {genre.trim()}
                </Tag>
              ))}
            </Flex>
          </Flex>
        }
      />
    </Card>
  );
}

export default WatchlistMovieCard;