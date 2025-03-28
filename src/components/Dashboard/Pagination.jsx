import React from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                className="cursor-pointer px-3 py-1 rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                <IoMdArrowDropleft />
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`cursor-pointer px-3 py-1 rounded ${page === currentPage ? "bg-orange-100" : ""}`}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}>
                    {page}
                </button>
            ))}

            <button
                className="cursor-pointer px-3 py-1 rounded disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                <IoMdArrowDropright />
            </button>
        </div>
    );
};

export default Pagination;
