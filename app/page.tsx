"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegStar, FaStar, FaRegClock, FaClock } from "react-icons/fa";
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

  // Fetch movies from the API when filters change
  useEffect(() => {
    async function getMovies() {
      try {
        const params = new URLSearchParams({
          page: "1",
          minYear: minYear.toString(),
          maxYear: maxYear.toString(),
          query: searchQuery,
        });

        if (selectedGenres.length > 0) {
          params.append("genres", selectedGenres.join(","));
        }

        const response = await fetch(`/api/titles?${params.toString()}`);
        const data = await response.json();

        setMovies(data.title || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
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
      <div className="flex w-full max-w-7xl justify-between">
        {/* Left Section: Search & Year Filters */}
        <div className="flex flex-col -ml-6 w-1/4">
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

        {/* Right Section: Genre Selection */}
        <div className="flex flex-col w-2/5">
          <span className="text-white font-semibold ml-6">Genres</span>
          <div className="flex flex-wrap gap-2 mt-2 justify-start ml-6">
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
      <div className="mt-8 ml-12 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-6 w-full">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-black rounded-lg border border-teal-300 overflow-hidden w-[380px] h-[380px] group"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Favorite & Watch Later Buttons (Hide until hovered over) */}
              <div className="absolute top-2 right-2 flex gap-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-white text-xl">
                  {movie.favorited ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-white stroke-white stroke-2" />}
                </button>
                <button className="text-white text-xl">
                  {movie.watchLater ? <FaClock className="text-blue-500" /> : <FaRegClock className="text-white stroke-white stroke-2" />}
                </button>
              </div>
              {/* Movie Image */}
              <Image 
                src={movie.image} 
                alt={movie.title} 
                width={200} 
                height={200} 
                className="w-full h-full object-cover" 
              />
              
              {/* Hover Details */}
              {hoveredMovie === movie.id && (
                <div className="absolute bottom-0 w-full bg-[#00003c] bg-opacity-90 text-white p-4 rounded-b-lg">
                  <h3 className="text-lg font-bold">{movie.title} ({movie.released})</h3>
                  <p className="text-sm">{movie.synopsis}</p>
                  <div className="mt-3">
                    <span className="px-3 py-1 text-sm font-semibold bg-teal-300 text-black rounded-full">{movie.genre}</span>
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
