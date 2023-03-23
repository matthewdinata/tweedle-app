import { useDispatch, useSelector } from 'react-redux';
import { setFriendList, selectFriendList } from '../features/friendsSlice';

// hooks
import { useFriendData } from './useFriendData';

export const useFriends = () => {
  const friendList = useSelector(selectFriendList);
  const { getFriendList } = useFriendData();
  const dispatch = useDispatch();

  const getFriendHelper = (uid) => {
    getFriendList(uid).then((friendList) => {
      dispatch(setFriendList(friendList));
    });
  };

  return {
    getFriendList: getFriendHelper,
    userFriends: friendList,
  };
};
