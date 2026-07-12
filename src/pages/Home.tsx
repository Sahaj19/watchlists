import { useState, useRef } from 'react';
import { Flex, Pagination } from 'antd';
import usePageTitle from '../hooks/usePageTitle';
import SearchBar from '../components/search/SearchBar';
import PageBanner from '../components/common/PageBanner';
import { searchMovies } from '../services/movie.service';
import EmptyState from '../components/common/EmptyState';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import MovieGrid from '../components/movie/MovieGrid';
import { notificationService } from '../services/notification.service';
import type { MovieSearchResult } from '../types/movie.types';
import { MOVIES_PER_PAGE } from '../utils/constants';
import ErrorState from '../components/common/ErrorState';


function Home() {
  usePageTitle('Watchlists');
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<MovieSearchResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const lastSearchRef = useRef({ term: '', page: 1 });

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchMovies(page: number) {
    if (!searchTerm.trim()) {
      notificationService.warning('Search Required', 'Please enter a movie title.');
      return;
    }

    // Avoid fetching if the search term and page are the same as the last search
    if (searchTerm.trim() === lastSearchRef.current.term && page === lastSearchRef.current.page) {
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const response = await searchMovies(searchTerm, page);

      if (response.Response === 'True') {
        setSearchResult(response);
        lastSearchRef.current = {
          term: searchTerm.trim(),
          page,
        };
      } else {
        setSearchResult(null);
      }
    } catch {
      setError(true);
      notificationService.error('Search Failed', 'Unable to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    setHasSearched(true);
    setCurrentPage(1);
    await fetchMovies(1);
  }

  async function handlePageChange(page: number) {
    setCurrentPage(page);

    await fetchMovies(page);
}

  if (error) {
    return (
      <ErrorState
        title="Unable to Load Movies"
        description="Please check your internet connection and try again."
        onRetry={() => fetchMovies(currentPage)}
      />
    );
  }

 return (
  <Flex vertical gap={24}>
    <PageBanner
      title="Welcome to"
      highlightedTitle="Watchlists"
      description="Browse movies, add them to your personal watchlist and share them with friends."
    />

    <SearchBar
      searchTerm={searchTerm}
      loading={loading}
      onSearchTermChange={setSearchTerm}
      onSearch={handleSearch}
    />

    {
      loading ? (
        <LoadingSkeleton />
      ) : searchResult ? (
        <MovieGrid movies={searchResult.Search} />
      ) : hasSearched ? (
        <EmptyState description="No movies found." />
      ) : (
        <EmptyState description="Search for a movie to get started." />
      )
    }

    {!loading && searchResult && (
      <Pagination
        current={currentPage}
        pageSize={MOVIES_PER_PAGE}
        total={Number(searchResult.totalResults)}
        onChange={handlePageChange}
        style={{
          alignSelf: 'center',
        }}
      />
    )}
  </Flex>
);
}

export default Home;