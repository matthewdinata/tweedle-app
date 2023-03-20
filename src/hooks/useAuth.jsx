import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUid, selectUser } from '../features/authSlice';

// firebase
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const useAuth = () => {
  const uid = useSelector(selectUid);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const loginHelper = (uid) => {
    dispatch(login(uid));
  };

  const logoutHelper = () => {
    // dispatch to the store with the logout action
    dispatch(logout());
    // sign out function from firebase
    signOut(auth);
  };

  return {
    currentUid: uid,
    currentUser: user,
    login: loginHelper,
    logout: logoutHelper,
  };
};
