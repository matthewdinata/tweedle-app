import { createSlice } from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friendList: [],
  },
  reducers: {
    setFriendList: (state, action) => {
      state.friendList = action.payload;
    },
  },
});

export const { setFriendList } = friendsSlice.actions;

// selectors
export const selectFriendList = (state) => state.friends.friendList;

export default friendsSlice.reducer;
