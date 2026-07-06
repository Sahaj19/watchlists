import { Button, Flex, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBarProps {
  searchTerm: string;
  loading: boolean;
  onSearchTermChange: (value: string) => void;
  onSearch: () => void;
}

function SearchBar({ searchTerm, loading, onSearchTermChange, onSearch }: SearchBarProps) {
  return (
    <Flex gap={12}>
      <Input
        size="large"
        placeholder="Search movies..."
        allowClear
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
        onPressEnter={onSearch}
      />

      <Button
        type="primary"
        size="large"
        icon={<SearchOutlined />}
        loading={loading}
        onClick={onSearch}
      >
        Search
      </Button>
    </Flex>
  );
}

export default SearchBar;