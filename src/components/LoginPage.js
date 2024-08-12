import React, { useRef, useState } from 'react';
import '../styles/LoginPage.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const usernameRef = useRef();  
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const username = usernameRef.current.value;  
    const password = passwordRef.current.value;

   
    if (!username) {  // Adjusted validation
      setError('Username cannot be empty');
      return;
    }

    if (!password) {
      setError('Password cannot be empty');
      return;
    }

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,  
        password
      });
      localStorage.setItem('authToken', response.data.token);
      navigate('/listing');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    
    <div className="login-container">
      <h1 className='Headings' >Star Wars</h1> 
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <input  ref={usernameRef} type="text" placeholder="Username" /> 
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
