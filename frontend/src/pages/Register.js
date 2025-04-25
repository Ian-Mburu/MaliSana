import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../services/loginService';


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    tel_no: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Password do not match");
      return;
    }
    try {
      const response = await API.post('/register/', {
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name,
        tel_no: formData.tel_no,
        password: formData.password,
        password2: formData.confirmPassword
      });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    }
  }

  return (
    <div className='reg-1'>
      <div className='reg-cont'>
        <form className='register-form' onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <p className="error-message">{error}</p>}
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
          <input type="number" name="tel_no" placeholder="Tel Number" value={formData.tel_no} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <p>Already have an account? <a className='login-link' href="/login">Login</a></p>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register