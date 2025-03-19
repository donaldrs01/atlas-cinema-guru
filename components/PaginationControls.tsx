interface PaginationControlsProps {
    currentPage: number;
    hasMore: boolean;
    onPageChange: (newPage: number) => void;
}

export default function PaginationControls({
    currentPage,
    hasMore,
    onPageChange,
}: PaginationControlsProps) {
    return (
        <div className="flex w-64 justify-center mt-8 gap-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-1/2 bg-teal-300 text-black px-6 py-2 rounded-l-full border-black disabled:opacity-50 hover:bg-teal-400 cursor-pointer"
            >
                Previous
            </button>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasMore}
                className="w-1/2 bg-teal-300 text-black px-6 py-2 rounded-r-full border-black hover:bg-teal-400 cursor-pointer disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}