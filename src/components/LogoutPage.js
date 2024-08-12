import React from 'react';
import { useNavigate } from 'react-router-dom'; // Update import to useNavigate
import '../styles/LogoutPage.css'; // Import the CSS for logout page

const LogoutPage = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = () => {
    // Clear token or authentication state
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login'); // Use navigate for redirection
  };

  return (
    <div className="logout-container">
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
      <button className="logout-button" onClick={handleLogout}>
        Go to Login Page
      </button>
    </div>
  );
};

export default LogoutPage;
