import { useState, useEffect } from "react";
import { UsersTitle } from "@/lib/definitions";
import useToggleWatchLater from "@/hooks/useToggleWatchLater";
import useToggleFavorite from "./useToggleFavorite";

export default function useWatchLater() {
  const [watchLater, setWatchLater] = useState<UsersTitle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const moviesPerPage = 6;

  const { toggleWatchLater } = useToggleWatchLater(watchLater, setWatchLater);
  const { toggleFavorite } = useToggleFavorite(watchLater, setWatchLater);

  // Fetch watch later movies from API
  useEffect(() => {
    async function fetchWatchLater() {
      try {
        const response = await fetch(`/api/watch-later?page=${currentPage}`);
        const data = await response.json();

        setWatchLater(data.watchLater || []);
        setHasMore(data.watchLater.length === moviesPerPage);
      } catch (error) {
        console.error("Error fetching watch later movies:", error);
      }
    }
    fetchWatchLater();
  }, [currentPage]);

  // Automatically remove movie from UI when untoggled
  async function removeWatchLater(movieId: string) {
    const updatedWatchLater = watchLater.filter((movie) => movie.id !== movieId);
    setWatchLater(updatedWatchLater);

    try {
      // Send request to backend
      const response = await fetch(`/api/watch-later/${movieId}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to remove from Watch Later list");

      console.log(data.message);
    } catch (error) {
      console.error("Error removing from Watch Later list:", error);
      // If API call fails, restore original UI
      setWatchLater((prevWatchLater) => [...prevWatchLater, watchLater.find((movie) => movie.id === movieId)!]);
    }
  }

  return {
    watchLater,
    setWatchLater,
    currentPage,
    setCurrentPage,
    hasMore,
    toggleWatchLater: removeWatchLater,
    toggleFavorite,
  };
}
