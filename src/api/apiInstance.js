import axios from "axios";

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiInstance.defaults.headers.common["Authorization"];
  }
};

export const clearAuthToken = () => {
  delete apiInstance.defaults.headers.common["Authorization"];
};
