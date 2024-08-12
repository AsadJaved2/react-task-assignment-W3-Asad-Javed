import React from 'react';
import '../styles/SearchFilter.css'; 

const SearchFilter = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchFilter;
