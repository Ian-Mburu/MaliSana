import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api'; // Correct import path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      const refresh = localStorage.getItem('refresh_token');
      
      if (token) {
        try {
          // Verify token first
          await api.post('/token/verify/', { token });
          const decoded = jwtDecode(token);
          setUser(decoded);
        } catch (verifyError) {
          if (refresh) {
            try {
              const response = await api.post('/token/refresh/', { refresh });
              localStorage.setItem('access_token', response.data.access);
              const decoded = jwtDecode(response.data.access);
              setUser(decoded);
            } catch (refreshError) {
              logout();
            }
          }
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

const login = async (credentials) => {
  try {
    const response = await api.post('/token/', credentials);
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    const decoded = jwtDecode(response.data.access);
    setUser(decoded);
  } catch (error) {
    console.error('Login failed:', error.response?.data);
    throw error;
  }
};

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);