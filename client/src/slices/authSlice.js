import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.token,
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      if (action.payload.token) {
        state.token = action.payload.token;
      }
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
