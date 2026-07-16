import { ClockCircleOutlined, FilterOutlined, ReloadOutlined, TagsOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Grid, Input, Select } from 'antd';

const { Search } = Input;
const { useBreakpoint } = Grid;

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
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  return (
    <Card styles={{ body: { padding: 16 } }} style={{ borderRadius: 12 }}>
      <Flex vertical gap={12}>
        <Search
          placeholder="Search movies..."
          value={value.search}
          allowClear
          onChange={(event) =>
            onChange({
              ...value,
              search: event.target.value,
            })
          }
        />

        {isDesktop ? (
          <Flex gap={12} wrap justify="space-between">
            <Flex gap={12} wrap flex="1 1 auto">
              <Select
                value={value.status}
                suffixIcon={<FilterOutlined />}
                style={{ width: 140 }}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Watched', value: 'watched' },
                  { label: 'Unwatched', value: 'unwatched' },
                ]}
                onChange={(status) => onChange({ ...value, status })}
              />
              <Select
                value={value.genre}
                suffixIcon={<TagsOutlined />}
                style={{ width: 160 }}
                options={[
                  { label: 'All genres', value: 'all' },
                  ...genres.map((genre) => ({ label: genre, value: genre })),
                ]}
                onChange={(genre) => onChange({ ...value, genre })}
              />
              <Select
                value={value.duration}
                suffixIcon={<ClockCircleOutlined />}
                style={{ width: 160 }}
                options={[
                  { label: 'All durations', value: 'all' },
                  { label: '< 90 mins', value: 'short' },
                  { label: '90 - 120 mins', value: 'medium' },
                  { label: '120 - 150 mins', value: 'long' },
                  { label: '150+ mins', value: 'epic' },
                ]}
                onChange={(duration) => onChange({ ...value, duration })}
              />
            </Flex>

            <Flex gap={8}>
              <Button type="primary" icon={<FilterOutlined />} onClick={onApply}>
                Apply
              </Button>
              <Button icon={<ReloadOutlined />} onClick={onReset}>
                Reset
              </Button>
            </Flex>
          </Flex>
        ) : (
          <>
            <Flex gap={8} wrap>
              <Select
                value={value.status}
                suffixIcon={<FilterOutlined />}
                style={{ flex: '1 1 130px' }}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Watched', value: 'watched' },
                  { label: 'Unwatched', value: 'unwatched' },
                ]}
                onChange={(status) => onChange({ ...value, status })}
              />
              <Select
                value={value.genre}
                suffixIcon={<TagsOutlined />}
                style={{ flex: '1 1 130px' }}
                options={[
                  { label: 'All genres', value: 'all' },
                  ...genres.map((genre) => ({ label: genre, value: genre })),
                ]}
                onChange={(genre) => onChange({ ...value, genre })}
              />
              <Select
                value={value.duration}
                suffixIcon={<ClockCircleOutlined />}
                style={{ flex: '1 1 130px' }}
                options={[
                  { label: 'All durations', value: 'all' },
                  { label: '< 90 mins', value: 'short' },
                  { label: '90 - 120 mins', value: 'medium' },
                  { label: '120 - 150 mins', value: 'long' },
                  { label: '150+ mins', value: 'epic' },
                ]}
                onChange={(duration) => onChange({ ...value, duration })}
              />
            </Flex>

            <Flex gap={8}>
              <Button type="primary" icon={<FilterOutlined />} onClick={onApply} style={{ flex: 1 }}>
                Apply
              </Button>
              <Button icon={<ReloadOutlined />} onClick={onReset} style={{ flex: 1 }}>
                Reset
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Card>
  );
}

export default WatchlistFilters;