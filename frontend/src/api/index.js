import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})


// add JWT tokens to request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('access');
    if (token) {
        config.headers.Authorization = 'Bearer ${token';
    }
    return config;
})

const apiMethods = {
    // Auth
    login: credentials => api.post('/auth/login/', credentials),
    register: data => api.post('/auth/register/', data),
    
    // Financial Data
    getDashboard: () => api.get('/dashboard/'),
    getTransactions: () => api.get('/transactions/'),
    createTransaction: data => api.post('/transactions/', data),
    getBudgets: () => api.get('/budgets/'),
    createBudget: data => api.post('/budgets/', data),
    getSavings: () => api.get('/saving-goals/'),
    createSaving: data => api.post('/saving-goals/', data),
    getBills: () => api.get('/bills/'),
    createBill: data => api.post('/bills/', data),
};

export default apiMethods;