import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: true, // important: include httpOnly cookie in browser
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (payload) => {
  const res = await api.post("/api/auth/register", payload);
  return res.data; // components expect message/data
};

export const loginUser = async (payload) => {
  const res = await api.post("/api/auth/login", payload);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export default api;