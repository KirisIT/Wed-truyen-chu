import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Hàm để lưu token vào localStorage
const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;
    
    // Lưu token và user info
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (name, email, password) => {
  return await axios.post(`${API_URL}/register`, { name, email, password });
};

// Hàm để kiểm tra và khôi phục session
export const initializeAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setToken(token);
  }
};

// Hàm logout
export const logout = () => {
  setToken(null);
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  // Thêm log để debug
  console.log('Current token:', token);
  return !!token;
};
