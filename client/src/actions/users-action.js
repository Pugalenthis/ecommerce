import api from "../utils/api";
import { usersLoadingSuccess } from "../slices/usersSlice";

export const getUsers = () => async (dispatch) => {
  try {
    const response = await api.get("http://localhost:4000/api/users/");
    console.log("response in data getUsers action", response.data);
    dispatch(usersLoadingSuccess(response.data));
  } catch (error) {
    console.log("error in getUsers", error);
  }
};
