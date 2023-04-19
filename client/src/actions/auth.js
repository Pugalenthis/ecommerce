import { loginSuccess, logOut } from "../slices/authSlice";
import api from "../utils/setAuthToken";
import { setAlertAction } from "./alert";
import { setAuthToken } from "../utils/setAuthToken";

export const login = (formData) => async (dispatch) => {
  try {
    const response = await api.post(
      "http://localhost:4000/api/users/login",
      formData
    );

    console.log("response in login action", response.data);
    dispatch(loginSuccess(response.data));
    dispatch(setAlertAction("Login successfully", "green"));
  } catch (error) {
    const errors = error.response.data.message.errors;
    errors.map((error) => {
      dispatch(setAlertAction(error.message, "red"));
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const response = await api.post(
      "http://localhost:4000/api/users/register",
      formData
    );
    dispatch(loginSuccess(response.data));
    console.log("response.data in register", response.data);

    dispatch(setAlertAction("Login successfully", "green"));
  } catch (error) {
    const errors = error.response.data.message.errors;
    errors.map((error) => {
      dispatch(setAlertAction(error.message, "red"));
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const response = await api.get("http://localhost:4000/api/users/user");
    console.log("response in loadUser", response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    console.log("error in loadUser");
  }
};
