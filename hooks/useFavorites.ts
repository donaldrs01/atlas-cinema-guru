import { useState, useEffect } from "react";
import { UsersTitle } from "@/lib/definitions";
import useToggleFavorite from "@/hooks/useToggleFavorite";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<UsersTitle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const moviesPerPage = 6;

  const { toggleFavorite } = useToggleFavorite(favorites, setFavorites);

  // Fetch favorites from API
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch(`/api/favorites?page=${currentPage}`);
        const data = await response.json();

        setFavorites(data.favorites || []);
        setHasMore(data.favorites.length === moviesPerPage);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    }
    fetchFavorites();
  }, [currentPage]);

  async function removeFavorite(movieId: string) {
    // Update UI and remove movie from state immediately on toggle
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);

    try {
      // Send request to backend
      const response = await fetch(`/api/favorites/${movieId}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove favorite");
      }
      console.log(data.message);
    } catch (error) {
      console.error("Error removing favorite:", error);
      setFavorites((prevFavorites) => [...prevFavorites, favorites.find((movie) => movie.id === movieId)!]);
    }
  }

  return {
    favorites,
    setFavorites,
    currentPage,
    setCurrentPage,
    hasMore,
    toggleFavorite: removeFavorite,
  };
}
