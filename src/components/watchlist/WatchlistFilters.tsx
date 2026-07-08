import { Button, Flex, Input, Select } from 'antd';

const { Search } = Input;

export interface WatchlistFiltersValue {
  search: string;
  status: 'all' | 'watched' | 'unwatched';
  genre: string;
  duration: string;
}

interface WatchlistFiltersProps {
  value: WatchlistFiltersValue;
  genres: string[];
  onChange: (value: WatchlistFiltersValue) => void;
  onApply: () => void;
  onReset: () => void;
}

function WatchlistFilters({ value, genres, onChange, onApply, onReset }: WatchlistFiltersProps) {
  return (
    <Flex
      gap={16}
      wrap
      align="center"
    >
      <Search
        placeholder="Search movies..."
        value={value.search}
        allowClear
        style={{
          width: 450,
        }}
        onChange={(event) =>
          onChange({
            ...value,
            search: event.target.value,
          })
        }
      />

      <Select
        value={value.status}
        style={{
          width: 160,
        }}
        options={[
          {
            label: 'All',
            value: 'all',
          },
          {
            label: 'Watched',
            value: 'watched',
          },
          {
            label: 'Unwatched',
            value: 'unwatched',
          },
        ]}
        onChange={(status) =>
          onChange({
            ...value,
            status,
          })
        }
      />

      <Select
        value={value.genre}
        style={{
          width: 180,
        }}
        options={[
          {
            label: 'All Genres',
            value: 'all',
          },
          ...genres.map((genre) => ({
            label: genre,
            value: genre,
          })),
        ]}
        onChange={(genre) =>
          onChange({
            ...value,
            genre,
          })
        }
      />

      <Select
        value={value.duration}
        style={{
          width: 180,
        }}
        options={[
          {
            label: 'All Durations',
            value: 'all',
          },
          {
            label: '< 90 mins',
            value: 'short',
          },
          {
            label: '90 - 120 mins',
            value: 'medium',
          },
          {
            label: '120 - 150 mins',
            value: 'long',
          },
          {
            label: '150+ mins',
            value: 'epic',
          },
        ]}
        onChange={(duration) =>
          onChange({
            ...value,
            duration,
          })
        }
      />

      <Button
        type="primary"
        onClick={onApply}
      >
        Apply Filters
      </Button>

      <Button onClick={onReset}>
        Reset
      </Button>
    </Flex>
  );
}

export default WatchlistFilters;