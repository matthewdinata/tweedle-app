import { useDispatch, useSelector } from 'react-redux';
import {
  selectChatId,
  selectUserChatWith,
  changeUser,
} from '../features/chatSlice';

export const useChat = () => {
  const chatId = useSelector(selectChatId);
  const userChatWith = useSelector(selectUserChatWith);

  const dispatch = useDispatch();

  const changeUserHelper = (userInfo) => {
    dispatch(changeUser(userInfo));
  };

  return {
    chatId,
    userChatWith,
    changeUser: changeUserHelper,
  };
};
