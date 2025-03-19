import { useState, useEffect } from "react";

const genreList = ["Romance", "Horror", "Drama", "Action", "Mystery", "Fantasy", "Thriller", "Western", "Sci-Fi", "Adventure"];

interface FiltersProps {
  onFiltersChange: (filters: {
    searchQuery: string;
    minYear: number;
    maxYear: number;
    selectedGenres: string[];
  }) => void;
}

export default function Filters({ onFiltersChange }: FiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [minYear, setMinYear] = useState(1990);
  const [maxYear, setMaxYear] = useState(2024);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Notify parent whenever filters change
  useEffect(() => {
    onFiltersChange({ searchQuery, minYear, maxYear, selectedGenres });
  }, [searchQuery, minYear, maxYear, selectedGenres]);

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  return (
    <div className="flex w-full max-w-7xl justify-between">
      {/* Search & Year Filters */}
      <div className="flex flex-col -ml-6 w-1/4">
        <span className="text-white font-semibold mb-2">Search</span>
        <input
          type="text"
          placeholder="Search Movies..."
          className="w-full p-3 rounded-full border border-teal-300 bg-black text-white"
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
              className="p-3 rounded-full border border-teal-300 bg-black text-white text-center"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <span className="text-white font-semibold mb-1">Max Year</span>
            <input
              type="number"
              value={maxYear}
              onChange={(e) => setMaxYear(Number(e.target.value))}
              className="p-3 rounded-full border border-teal-300 bg-black text-white text-center"
            />
          </div>
        </div>
      </div>

      {/* Genre Selection */}
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
  );
}
