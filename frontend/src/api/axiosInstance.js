import axios from "axios";

// Backend ka base URL — coworker se exact port confirm kar lena (usually 5000)
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Har request ke saath automatically token attach ho jayega
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;