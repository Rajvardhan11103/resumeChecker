import axios from 'axios';

const api = axios.create({
  baseURL: '' // proxy in package.json will forward to backend at http://localhost:5000
});

const auth = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data)
};

const resume = {
  upload: (formData, config = {}) => api.post('/api/resume/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' }, ...config })
};

export { auth, resume };
export default api;
