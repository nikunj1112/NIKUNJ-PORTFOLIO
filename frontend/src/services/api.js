import axios from 'axios';

const API_URL = 'http://localhost:3030/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  getMe: () => api.get('/auth/me'),
};

// Profile API
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
};

// Skills API
export const skillsAPI = {
  getSkills: () => api.get('/skills'),
  createSkill: (data) => api.post('/skills', data),
  updateSkill: (id, data) => api.put(`/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
};

// Projects API
export const projectsAPI = {
  getProjects: () => api.get('/projects'),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
};

// Messages API
export const messagesAPI = {
  getMessages: () => api.get('/messages'),
  createMessage: (data) => api.post('/messages', data),
  deleteMessage: (id) => api.delete(`/messages/${id}`),
};

// GitHub API
export const githubAPI = {
  getRepos: () => api.get('/github/repos'),
  getStats: () => api.get('/github/stats'),
};

export default api;

