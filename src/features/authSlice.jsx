import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: null,
    userInfo: {},
    isAuthenticated: false,
    isDataComplete: false,
  },
  reducers: {
    login: (state, action) => {
      state.uid = action.payload;
      state.isAuthenticated = true;
    },
    setUserData: (state, action) => {
      state.userInfo = action.payload;
      state.isDataComplete = true;
    },
    logout: (state) => {
      state.uid = null;
      state.userInfo = {};
      state.isAuthenticated = false;
      state.isDataComplete = false;
    },
  },
});

export const { login, logout, setUserData } = authSlice.actions;

// selectors
export const selectUid = (state) => state.auth.uid;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectUser = (state) => state.auth;

export default authSlice.reducer;
