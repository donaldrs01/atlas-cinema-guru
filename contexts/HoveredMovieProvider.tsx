"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HoveredMovieContextType {
    hoveredMovie: string | null;
    setHoveredMovie: (id: string | null) => void;
}

const HoveredMovieContext = createContext<HoveredMovieContextType | undefined>(undefined);

export function HoveredMovieProvider({ children }: {children: ReactNode }) {
    const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);

    return (
        <HoveredMovieContext.Provider value={{ hoveredMovie, setHoveredMovie }}>
            {children}
        </HoveredMovieContext.Provider>
    );
}

// Custom hook to use HoveredMovie outside
export function useHoveredMovie() {
    const context = useContext(HoveredMovieContext);
    if (!context) {
        throw new Error("Needs to be placed within a HoveredMovieProvider");
    }
    return context;
}