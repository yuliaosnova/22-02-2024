import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    login: "",
    uid: "",
    isLoggedIn: false,
  },
  reducers: {
    logIn(state, action) {
      state.login = action.payload.login;
      state.uid = action.payload.uid;
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.login = "";
      state.uid = "";
      state.isLoggedIn = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { logIn, logOut } = userSlice.actions;
