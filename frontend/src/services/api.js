import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fixnanba_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('fixnanba_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

// Technicians
export const getTechnicians = (params) => api.get('/technicians', { params });
export const getTechnicianById = (id) => api.get(`/technicians/${id}`);
export const createTechnician = (data) => api.post('/technicians', data);
export const updateTechnician = (id, data) => api.put(`/technicians/${id}`, data);
export const deleteTechnician = (id) => api.delete(`/technicians/${id}`);

// Categories
export const getCategories = () => api.get('/categories');

// Districts
export const getDistricts = () => api.get('/districts');

// Reviews
export const getReviews = () => api.get('/reviews');
export const createReview = (data) => api.post('/reviews', data);

// Auth
export const adminLogin = (data) => api.post('/auth/login', data);

// Diagnosis
export const getDiagnosis = (data) => api.post('/diagnosis', data);

export default api;
