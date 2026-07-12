import { Button, Flex, Grid, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

interface SearchBarProps {
  searchTerm: string;
  loading: boolean;
  onSearchTermChange: (value: string) => void;
  onSearch: () => void;
}

function SearchBar({ searchTerm, loading, onSearchTermChange, onSearch }: SearchBarProps) {
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const buttonMinWidth = isMobile ? "100%" : 140;

  return (
    <Flex gap={12} vertical={isMobile}>
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
        style={{ minWidth: buttonMinWidth }}
      >
        Search
      </Button>
    </Flex>
  );
}

export default SearchBar;