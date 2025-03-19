import MovieCard from "@/components/MovieCard";
import { UsersTitle } from "@/lib/definitions";

interface MovieGridProps {
    movies: UsersTitle[];
    toggleFavorite?: (id: string) => void;
    toggleWatchLater?: (id: string) => void;
}

export default function MovieGrid({ movies, toggleFavorite, toggleWatchLater }: MovieGridProps) {
    return (
        <div className="mt-8 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-6 w-full">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        toggleFavorite={toggleFavorite ?? (() => {})}
                        toggleWatchLater={toggleWatchLater ?? (() => {})}
                    />
                ))
            ) : (
                <p className="text-white">No movies found...</p>
            )}
        </div>
  );
}