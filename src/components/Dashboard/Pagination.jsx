import React from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

        if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
        if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];

        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };

    return (
        <nav className="flex items-center space-x-2 mt-4" aria-label="Pagination">
            <button
                className="cursor-pointer px-3 py-1 rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
            >
                <IoMdArrowDropleft />
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`cursor-pointer px-3 py-1 rounded ${page === currentPage ? "bg-orange-100" : ""}`}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}
                    aria-current={page === currentPage ? "page" : undefined}
                    aria-label={typeof page === "number" ? `Page ${page}` : "More pages"}
                >
                    {page}
                </button>
            ))}

            <button
                className="cursor-pointer px-3 py-1 rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
            >
                <IoMdArrowDropright />
            </button>
        </nav>
    );
};

export default Pagination;
