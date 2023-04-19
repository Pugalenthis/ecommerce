import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers["x-auth-token"] = `${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    console.log("error in api.js", error);
    return Promise.reject(error);
  }
);

export default api;
