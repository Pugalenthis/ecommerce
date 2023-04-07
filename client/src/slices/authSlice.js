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
      localStorage.setItem("token", action.payload.token);
      console.log("action.payload", action.payload);
      const { token, ...others } = action.payload;
      console.log("other in slice", others);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = others;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.isLoading = false;
      state.token = null;
      state.isAuthenticated = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;
