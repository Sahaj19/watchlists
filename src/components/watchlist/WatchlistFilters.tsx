import { ClockCircleOutlined, FilterOutlined, ReloadOutlined, TagsOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Input, Select } from 'antd';

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
    <Card styles={{ body: { padding: 16 } }} style={{ borderRadius: 12 }} >
      <Flex gap={12} wrap align="center">
        <Search
          placeholder="Search movies..."
          value={value.search}
          allowClear
          style={{ flex: '1 1 280px', minWidth: 220 }}
          onChange={(event) =>
            onChange({
              ...value,
              search: event.target.value,
            })
          }
        />

        <Select
          value={value.status}
          suffixIcon={<FilterOutlined />}
          style={{ flex: '0 1 160px', minWidth: 140 }}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Watched', value: 'watched' },
            { label: 'Unwatched', value: 'unwatched' },
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
          suffixIcon={<TagsOutlined />}
          style={{ flex: '0 1 180px', minWidth: 160 }}
          options={[
            { label: 'All genres', value: 'all' },
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
          suffixIcon={<ClockCircleOutlined />}
          style={{ flex: '0 1 180px', minWidth: 160 }}
          options={[
            { label: 'All durations', value: 'all' },
            { label: '< 90 mins', value: 'short' },
            { label: '90 - 120 mins', value: 'medium' },
            { label: '120 - 150 mins', value: 'long' },
            { label: '150+ mins', value: 'epic' },
          ]}
          onChange={(duration) =>
            onChange({
              ...value,
              duration,
            })
          }
        />

        <Flex gap={8} style={{ flex: '0 0 auto' }}>
          <Button type="primary" icon={<FilterOutlined />} onClick={onApply}>Apply</Button>
          <Button icon={<ReloadOutlined />} onClick={onReset}>Reset</Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default WatchlistFilters;