import { useState, useEffect } from "react";
import { UsersTitle } from "@/lib/definitions"
import useToggleFavorite from "@/hooks/useToggleFavorite";
import useToggleWatchLater from "./useToggleWatchLater";

export default function useMovies() {
  const [movies, setMovies] = useState<UsersTitle[]>([]);
  const [filters, setFilters] = useState<{
    searchQuery: string;
    minYear: number;
    maxYear: number;
    selectedGenres: string[],
  }>({
    searchQuery: "",
    minYear: 1990,
    maxYear: 2024,
    selectedGenres: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const moviesPerPage = 6;
  const { toggleFavorite } = useToggleFavorite(movies, setMovies);
  const { toggleWatchLater} = useToggleWatchLater(movies, setMovies);

  // Grab movies from API
  useEffect(() => {
    async function getMovies() {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          minYear: filters.minYear.toString(),
          maxYear: filters.maxYear.toString(),
          query: filters.searchQuery,
        });

        if (filters.selectedGenres.length > 0) {
          params.append("genres", filters.selectedGenres.join(","));
        }

        const response = await fetch(`/api/titles?${params.toString()}`);
        const data = await response.json();
        
        setMovies(data.title || []);
        setHasMore(data.title.length === moviesPerPage);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    getMovies();
  }, [filters, currentPage]);

  return {
    movies,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    hasMore,
    toggleFavorite,
    toggleWatchLater,
  };
}
