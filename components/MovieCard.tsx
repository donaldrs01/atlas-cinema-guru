"use client";

import { useHoveredMovie } from "@/contexts/HoveredMovieProvider";
import Image from "next/image";
import { FaRegStar, FaStar, FaRegClock, FaClock } from "react-icons/fa";

interface MovieCardProps {
    movie: {
        id: string;
        title: string;
        synopsis: string;
        released: number;
        genre: string;
        image: string;
        favorited: boolean;
        watchLater: boolean;
    };
    toggleFavorite?: (id: string) => void;
    toggleWatchLater? : (id: string) => void;
}

export default function MovieCard({ movie, toggleFavorite, toggleWatchLater }: MovieCardProps) {
    const { hoveredMovie, setHoveredMovie } = useHoveredMovie();

    return (
        <div
            className="relative bg-black rounded-lg border border-teal-300 overflow-hidden w-[380px] h-[380px] group"
            onMouseEnter={() => setHoveredMovie(movie.id)}
            onMouseLeave={() => setHoveredMovie(null)}
        >
            {/* Favorite & Watch Later Buttons */}
            <div className="absolute top-2 right-2 flex gap-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="text-white text-xl cursor-pointer" onClick={() => toggleFavorite?.(movie.id)}>
                {movie.favorited ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-white stroke-white stroke-2" />}
            </button>
            <button className="text-white text-xl cursor-pointer" onClick={() => toggleWatchLater?.(movie.id)}>
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
    );
}