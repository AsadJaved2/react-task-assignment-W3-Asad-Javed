import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {

      onPageChange(page);
        console.log(page);
    }
    
  };

  const handlePageInput = (e) => {
    const page = Number(e.target.value);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <input
        type="number"
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={handlePageInput}
        className="pagination-input"
      />
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
