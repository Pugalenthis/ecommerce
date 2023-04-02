import axios from "axios";

export const setAuthToken = (token) => {
  if (localStorage.token) {
    axios.defaults.headers.common["access_token"] = token;
  } else {
    delete axios.defaults.headers.common["access_token"];
  }
};
