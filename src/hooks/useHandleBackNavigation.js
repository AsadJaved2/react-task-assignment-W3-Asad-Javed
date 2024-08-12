import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useHandleBackNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackNavigation = () => {
      if (location.pathname === '/listing') {
       
        localStorage.removeItem('authToken');
        navigate('/login', { replace: true }); 
      }
    };

    window.addEventListener('popstate', handleBackNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [location.pathname, navigate]);
};

export default useHandleBackNavigation;
