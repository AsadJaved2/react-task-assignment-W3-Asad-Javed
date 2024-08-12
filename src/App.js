import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ListingPage from './pages/ListingPage';
import LogoutPage from './components/LogoutPage';


function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
  );
}

export default App;
