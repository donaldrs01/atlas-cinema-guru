import { UsersTitle } from "@/lib/definitions";
import React from "react";

export default function useToggleWatchLater(
  movies: UsersTitle[],
  setMovies: React.Dispatch<React.SetStateAction<UsersTitle[]>>
) {
  async function toggleWatchLater(movieId: string) {
    try {
      // Check if the movie is currently in watch later list
      const movieIndex = movies.findIndex((movie) => movie.id === movieId);
      const isWatchLater = movieIndex !== -1 && movies[movieIndex].watchLater;

      // Send request to backend
      const response = await fetch(`/api/watch-later/${movieId}`, {
        method: isWatchLater ? "DELETE" : "POST", // Choose HTTP method based on whether watch later or not
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to toggle watch later");

      console.log(data.message);

      // Update UI based on backend response
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? { ...movie, watchLater: !movie.watchLater } : movie
        )
      );
    } catch (error) {
      console.error("Error toggling watch later:", error);
    }
  }

  return { toggleWatchLater };
}
