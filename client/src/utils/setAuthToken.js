import api from "./api";

export const setAuthToken = (token) => {
  console.log("token in setauthtoken", token);
  if (token) {
    console.log("entered into if");
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    console.log("entered into else");
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default api;
