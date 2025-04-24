import axios from "axios";


const API = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
    }
});

// function to refresh the access token
const refreshToken = async () => {
    try{
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) throw new Error('No refresh token available');

        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem('token', newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Redirect to login if refresh failed
        throw error;
    }
};


// Intercept requests to add the token
API.interceptors.request.use(async (config) => {
    let token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  
  // Intercept responses to check for expired token
  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && error.response?.data?.code === 'token_not_valid') {
        try {
          const newToken = await refreshToken();
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return API.request(error.config); // Retry the original request
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default API;