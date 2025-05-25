import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api'; // Correct import path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access');
      const refresh = localStorage.getItem('refresh');
      
      if (token && refresh) {
        try {
          // Use the api instance instead of direct axios calls
          await api.post('/token/verify/', { token });
          const decoded = jwtDecode(token);
          setUser(decoded);
        } catch (error) {
          try {
            // Use api instance for refresh
            const response = await api.post('/token/refresh/', { refresh });
            localStorage.setItem('access', response.data.access);
            const decoded = jwtDecode(response.data.access);
            setUser(decoded);
          } catch (refreshError) {
            logout();
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