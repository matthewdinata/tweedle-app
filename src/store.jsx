import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import friendsReducer from './features/friendsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
  },
});
