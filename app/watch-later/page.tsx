"use client";

import useWatchLater from "@/hooks/useWatchLater";
import MovieGrid from "@/components/MovieGrid";
import PaginationControls from "@/components/PaginationControls";

export default function WatchLaterPage() {
  const { watchLater, setWatchLater, currentPage, setCurrentPage, hasMore, toggleWatchLater, toggleFavorite } = useWatchLater();

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-5xl text-white font-bold mb-4">Watch Later</h1>

      {/* Movie Grid */}
      <MovieGrid movies={watchLater} toggleFavorite={toggleFavorite} toggleWatchLater={toggleWatchLater} />

      {/* Pagination Controls */}
      <PaginationControls 
        currentPage={currentPage} 
        hasMore={hasMore} 
        onPageChange={setCurrentPage} 
      />
    </main>
  );
}
