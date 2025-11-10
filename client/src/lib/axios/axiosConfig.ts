import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    toast.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(`[API ERROR ${error.response.status}]`, error.response.data);
    } else if (error.request) {
      toast.error("[API ERROR] No response received from server");
    } else {
      toast.error("[API ERROR] Unexpected error");
    }

    return Promise.reject(error);
  }
);

export default api;
