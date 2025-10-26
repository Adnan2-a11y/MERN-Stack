// src/api.js


// 🧠 Core Idea: Each function returns the backend response (Promise)
/*export const signupUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
*/
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/auth"; // backend route

axios.defaults.withCredentials = true; // Enable sending cookies with requests

// 🧠 Core Idea: Each function returns the backend response (Promise)
 export const registerUser = async (formData) => {
  return await axios.post(`${BASE_URL}/register`, formData);
 };

 export const loginUser = async (formData) => {
  return await axios.post(`${BASE_URL}/login`, formData);
 };

 export const logoutUser = async (formData) => {
  return await axios.post(`${BASE_URL}/logout`, formData);
 };