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
    logout: (state) => {
      state.uid = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

// selectors
export const selectUid = (state) => state.auth.uid;
export const selectUser = (state) => state.auth;

export default authSlice.reducer;
