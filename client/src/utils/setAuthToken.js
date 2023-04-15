import axios from "axios";

export const setAuthToken = (token) => {
  console.log("token in setauthtoken", token);
  if (token) {
    console.log("entered into if");
    localStorage.setItem("token", token);
    axios.defaults.headers.common["x-auth-token"] = token;
    axios.defaults.headers.common["name"] = "pugalenthi";
    console.log("after setting headers", axios.defaults.headers.common);
  } else {
    console.log("entered into else");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
