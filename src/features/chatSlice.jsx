import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: '',
    user: {},
  },
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload.user;
      state.chatId =
        action.payload.currentUid > action.payload.user.uid
          ? action.payload.currentUid + action.payload.user.uid
          : action.payload.user.uid + action.payload.currentUid;
    },
  },
});

export const { changeUser } = chatSlice.actions;

// selectors
export const selectChatId = (state) => state.chat.chatId;
export const selectUserChatWith = (state) => state.chat.user;

export default chatSlice.reducer;
