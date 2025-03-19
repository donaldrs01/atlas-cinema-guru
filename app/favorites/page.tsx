"use client";

import useFavorites from "@/hooks/useFavorites";
import MovieGrid from "@/components/MovieGrid";
import PaginationControls from "@/components/PaginationControls";
import useToggleWatchLater from "@/hooks/useToggleWatchLater";

export default function FavoritesPage() {
  const { favorites, setFavorites, currentPage, setCurrentPage, hasMore, toggleFavorite } = useFavorites();
  const { toggleWatchLater } = useToggleWatchLater(favorites, setFavorites);

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-5xl text-white font-bold mb-4">Favorites</h1>

      {/* Movie Grid */}
      <MovieGrid movies={favorites} toggleFavorite={toggleFavorite} toggleWatchLater={toggleWatchLater} />

      {/* Pagination Controls */}
      <PaginationControls 
        currentPage={currentPage} 
        hasMore={hasMore} 
        onPageChange={setCurrentPage} 
      />
    </main>
  );
}
