"use client";

import useMovies from "@/hooks/useMovies";
import MovieGrid from "@/components/MovieGrid";
import Filters from "@/components/Filters";
import PaginationControls from "@/components/PaginationControls";

export default function Page() {
  const { movies, filters, setFilters, currentPage, setCurrentPage, hasMore, toggleFavorite, toggleWatchLater } = useMovies();

  return (
    <main className="p-6 flex flex-col items-center">
      <Filters onFiltersChange={setFilters} />
      <MovieGrid movies={movies} toggleFavorite={toggleFavorite} toggleWatchLater={toggleWatchLater} />
      <PaginationControls
        currentPage={currentPage}
        hasMore={hasMore}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
