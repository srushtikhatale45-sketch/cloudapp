import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "";

const createInstance = (path) => {
  const instance = axios.create({ baseURL: `${BASE_URL}${path}` });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const authApi = createInstance("");
export const backupApi = createInstance("");
export const restoreApi = createInstance("");
export const analyticsApi = createInstance("");
