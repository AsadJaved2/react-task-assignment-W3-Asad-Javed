import React, { useState, useCallback } from 'react';
import useFetchCharacters from '../hooks/useFetchCharacters';
import CharacterCard from '../components/CharacterCard';
import CharacterDetailsModal from '../components/CharacterDetailsModal';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter'; // Import the SearchFilter component
import '../styles/ListingPage.css'; // Ensure this CSS file exists
import { useNavigate } from 'react-router-dom';
import useHandleBackNavigation from '../hooks/useHandleBackNavigation'; // Import the custom hook

const ListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ species: '', homeworld: '' });

  // Fetch characters with search term and filters
  const { data: characters, loading, error, totalPages } = useFetchCharacters(currentPage, searchTerm, filters);

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useHandleBackNavigation(); // Use the custom hook

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCharacterClick = (character) => {
    fetch(character.homeworld)
      .then(response => response.json())
      .then(data => {
        setSelectedCharacter({ ...character, homeworld: data });
        setModalIsOpen(true);
      })
      .catch(err => {
        console.error('Failed to load homeworld data.', err);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCharacter(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Memoized search handler to avoid unnecessary re-renders
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when search term changes
  }, []);

  return (
    <div className="app">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1 className="app-heading" style={{ textAlign: 'center' }}>Star Wars Information</h1>
      <SearchFilter
        search={searchTerm}
        setSearch={handleSearch}
        filters={filters}
        setFilters={setFilters}
      />
      {loading && <div className="loading" style={{ textAlign: 'center' }}>Loading...</div>}
      {error && <div className="error" style={{ textAlign: 'center' }}>{error}</div>}
      <div className="new-cards" style={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "stretch",
        justifyContent: "space-between"
      }}>
        {characters.map(character => (
          <CharacterCard
            key={character.name}
            character={character}
            onClick={handleCharacterClick}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {selectedCharacter && (
        <CharacterDetailsModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          character={selectedCharacter}
        />
      )}
    </div>
  );
};

export default ListingPage;
