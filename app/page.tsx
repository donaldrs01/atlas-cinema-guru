"use client";

import { useState, useEffect } from "react";
import { fetchTitles } from "@/lib/data";
import Image from "next/image";
import { FaStar, FaClock } from "react-icons/fa";
import { UsersTitle } from "@/lib/definitions";

const genreList = [
  "Romance", "Horror", "Drama", "Action", "Mystery",
  "Fantasy", "Thriller", "Western", "Sci-Fi", "Adventure"
];

export default function Page() {
  const [movies, setMovies] = useState<UsersTitle[]>([]);
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [minYear, setMinYear] = useState(1990);
  const [maxYear, setMaxYear] = useState(2024);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Fetch movies when filters change
  useEffect(() => {
    async function getMovies() {
      const fetchedMovies = await fetchTitles(1, minYear, maxYear, searchQuery, selectedGenres, "user@example.com");
      setMovies(fetchedMovies);
    }
    getMovies();
  }, [searchQuery, minYear, maxYear, selectedGenres]);

  // Toggle genre selection
  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  return (
    <main className="p-6 flex flex-col items-center">
      {/* Filters Section */}
      <div className="flex w-full max-w-6xl justify-between items-start">
        {/* Search & Year Filters */}
        <div className="flex flex-col w-1/3">
          <span className="text-white font-semibold mb-2">Search</span>
          <input
            type="text"
            placeholder="Search Movies..."
            className="w-full p-3 rounded-full border border-teal-300 bg-black text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Year Filters */}
          <div className="flex w-full gap-4 mt-4">
            <div className="flex flex-col w-1/2">
              <span className="text-white font-semibold mb-1">Min Year</span>
              <input
                type="number"
                value={minYear}
                onChange={(e) => setMinYear(Number(e.target.value))}
                className="p-3 rounded-full border border-teal-300 bg-black text-white text-center focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <span className="text-white font-semibold mb-1">Max Year</span>
              <input
                type="number"
                value={maxYear}
                onChange={(e) => setMaxYear(Number(e.target.value))}
                className="p-3 rounded-full border border-teal-300 bg-black text-white text-center focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>
        </div>

        {/* Genre Selection */}
        <div className="flex flex-col w-1/3">
          <span className="text-white font-semibold">Genres</span>
          <div className="flex flex-wrap gap-2 mt-2 justify-start">
            {genreList.map((genre) => (
              <button 
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-4 py-2 rounded-full border border-teal-300 text-white hover:bg-teal-300 hover:text-black ${
                  selectedGenres.includes(genre) ? "bg-teal-300 text-black" : ""
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-black rounded-lg border border-teal-300 overflow-hidden"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Movie Image */}
              <Image src={movie.image} alt={movie.title} width={200} height={300} className="w-full h-[300px] object-cover" />

              {/* Hover Details */}
              {hoveredMovie === movie.id && (
                <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex flex-col justify-center items-center p-4">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm">{movie.synopsis}</p>
                  <p className="text-sm mt-1">Genre: {movie.genre} | {movie.released}</p>

                  {/* Favorite & Watch Later Buttons */}
                  <div className="flex gap-4 mt-2">
                    <button className="text-white text-2xl">
                      <FaStar className={movie.favorited ? "text-yellow-500" : "text-gray-400"} />
                    </button>
                    <button className="text-white text-2xl">
                      <FaClock className={movie.watchLater ? "text-blue-500" : "text-gray-400"} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-white">No movies found...</p>
        )}
      </div>
    </main>
  );
}
