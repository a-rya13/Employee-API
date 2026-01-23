import axios from "axios";

// Backend base URL
const API_URL = "http://localhost:5000/api/auth";

// LOGIN
export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);

  // Save token after successful login
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// REGISTER
export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};
