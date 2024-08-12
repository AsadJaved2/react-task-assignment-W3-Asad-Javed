import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/LogoutPage.css'; 

const LogoutPage = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/'); // Use navigate for redirection
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
