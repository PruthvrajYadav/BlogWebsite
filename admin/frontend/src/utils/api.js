import axios from 'axios';

// The correct production backend URL - hardcoded to prevent wrong env vars from overriding
const PRODUCTION_URL = 'https://blogbackend3-2ygf.onrender.com/api/admin';
const LOCAL_URL = 'http://localhost:5001/api/admin';

// Use local URL in development, production URL in production
// This ignores VITE_ADMIN_API_BASE_URL to fix deployment issues
const BASE_URL = import.meta.env.DEV ? LOCAL_URL : PRODUCTION_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

// Request Interceptor: Inject Token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
        config.headers['auth-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && [400, 401].includes(error.response.status)) {
        localStorage.removeItem('auth-token');
        if (!window.location.pathname.includes('login')) {
            window.location.href = '/';
        }
    }
    return Promise.reject(error);
});

export default api;
