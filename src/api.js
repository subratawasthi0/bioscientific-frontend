// src/services/api.js

// Automatically connects to your backend port. Change if your backend is on a different port.
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// Get the JWT token saved during login
const getToken = () => localStorage.getItem('adminToken');

const request = async (endpoint, method = 'GET', body = null, isFile = false) => {
  const headers = {};
  
  // Set headers for JSON or File uploads
  if (!isFile) {
    headers['Content-Type'] = 'application/json';
  }

  // Attach the admin token if it exists (for dashboard requests)
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = isFile ? body : JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || 'Something went wrong');
  }
  return json;
};

// Standard API methods to use in your components
export const api = {
  get: (endpoint) => request(endpoint, 'GET'),
  post: (endpoint, body, isFile = false) => request(endpoint, 'POST', body, isFile),
  put: (endpoint, body, isFile = false) => request(endpoint, 'PUT', body, isFile),
  delete: (endpoint) => request(endpoint, 'DELETE'),
};