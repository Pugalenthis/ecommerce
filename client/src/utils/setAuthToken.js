import axios from "axios";

export const setAuthToken = (token) => {
  console.log("set auth token is called", token);
  if (token) {
    axios.defaults.headers.common["access_token"] = token;
    localStorage.setItem("token", token);
    console.log(
      "entered into if",
      axios.defaults.headers.common["access_token"]
    );
  } else {
    delete axios.defaults.headers.common["access_token"];
    localStorage.removeItem("token");
    console.log(
      "entered into else",
      axios.defaults.headers.common["access_token"]
    );
  }
};
