import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, ...others } = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = others;
    },
    logOut: (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.isAuthenticated = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;
