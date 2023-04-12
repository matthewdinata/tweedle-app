import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import friendsReducer from './features/friendsSlice';
import chatReducer from './features/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
    chat: chatReducer,
  },
});
