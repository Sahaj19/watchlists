import { Flex, Grid } from "antd";
import MovieCard from "./MovieCard";
import type { MovieSummary } from "../../types/movie.types";
import { MOVIE_CARD_WIDTH } from "../../utils/constants";

const { useBreakpoint } = Grid;

interface MovieGridProps {
  movies: MovieSummary[];
}

function MovieGrid({ movies }: MovieGridProps) {
  const screens = useBreakpoint();

  return (
    <Flex
      wrap
      gap={24}
      justify={screens.lg ? "flex-start" : "center"}
    >
      {movies.map((movie) => (
        <Flex
          key={movie.imdbID}
          style={{
            width: MOVIE_CARD_WIDTH,
            flexShrink: 0,
          }}
        >
          <MovieCard movie={movie} />
        </Flex>
      ))}
    </Flex>
  );
}

export default MovieGrid;