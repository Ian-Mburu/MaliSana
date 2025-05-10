import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../services/loginService';
import { setCredentials } from '../slices/LoginSlice';




const Login = () => {
  const [tel_no, setTel_no] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await API.post('/login/', {tel_no, password});
      const {access, refresh} = response.data;

      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);

      dispatch(setCredentials({user: {tel_no}, token: access}));
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password. Please try again.')
    }
  };

  return (
    <div>
      
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to Your Account</h2>
          {/* {error && <p style={{color: 'blue'}} className="error-message">{error}</p>} */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={tel_no}
            onChange={(e) => setTel_no(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <div className="login-links">
            <a href="/forgot-password">Forgot Password?</a>
            <p>Don't have an account? <a href="/register">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login