import axios from "axios";

// API base URL (pointing to Django backend)
const API_URL = "http://127.0.0.1:8000/api/";

export const loginUser = async (userType: string, credentials: any) => {
  return axios.post(`${API_URL}${userType}/login/`, credentials);
};

export const registerUser = async (userType: string, data: any) => {
  return axios.post(`${API_URL}${userType}/register/`, data);
};
