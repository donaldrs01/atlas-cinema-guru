import { UsersTitle } from "@/lib/definitions";
import React from "react";

export default function useToggleFavorite(
  movies: UsersTitle[],
  setMovies: React.Dispatch<React.SetStateAction<UsersTitle[]>>
) {
  async function toggleFavorite(movieId: string) {
    try {
      // Check if the movie is currently favorited
      const movieIndex = movies.findIndex((movie) => movie.id === movieId);
      const isFavorited = movieIndex !== -1 && movies[movieIndex].favorited;

      // Send request to backend
      const response = await fetch(`/api/favorites/${movieId}`, {
        method: isFavorited ? "DELETE" : "POST", // Choose HTTP method based on whether favorited or not
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to toggle favorite");

      console.log(data.message);

      // Update UI based on backend response
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? { ...movie, favorited: !movie.favorited } : movie
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }

  return { toggleFavorite };
}
