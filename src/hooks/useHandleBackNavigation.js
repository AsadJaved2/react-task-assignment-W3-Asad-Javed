import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useHandleBackNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackNavigation = () => {
      if (location.pathname === '/listing') {
        // Logout and redirect
        localStorage.removeItem('authToken');
        navigate('/login', { replace: true }); // Use replace to avoid adding a new history entry
      }
    };

    // Add a listener for popstate events
    window.addEventListener('popstate', handleBackNavigation);

    // Clean up the listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [location.pathname, navigate]);
};

export default useHandleBackNavigation;
