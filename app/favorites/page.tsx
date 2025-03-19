"use client";

import useFavorites from "@/hooks/useFavorites";
import MovieGrid from "@/components/MovieGrid";
import PaginationControls from "@/components/PaginationControls";

export default function FavoritesPage() {
  const { favorites, currentPage, setCurrentPage, hasMore, toggleFavorite } = useFavorites();

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-5xl text-white font-bold mb-4">Favorites</h1>

      <MovieGrid movies={favorites} toggleFavorite={toggleFavorite} />

      <PaginationControls 
        currentPage={currentPage} 
        hasMore={hasMore} 
        onPageChange={setCurrentPage} 
      />
    </main>
  );
}
