import axios from "axios";
import config from "@/config";

const api = axios.create({
  baseURL: `${config.apiUrl}/api`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (reqConfig) => {
    if (config.isDev) {
      console.log(`[API] ${reqConfig.method?.toUpperCase()} ${reqConfig.url}`);
    }
    return reqConfig;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (config.isDev) {
      console.error('[API Error]', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
