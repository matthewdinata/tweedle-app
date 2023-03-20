import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  logout,
  setUserData,
  selectUid,
  selectUser,
} from '../features/authSlice';

// firebase
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useUserData } from './useUserData';

export const useAuth = () => {
  const uid = useSelector(selectUid);
  const user = useSelector(selectUser);
  const { getUserData } = useUserData();
  const dispatch = useDispatch();

  const loginHelper = (uid) => {
    dispatch(login(uid));

    // get complete userData
    getUserData(uid).then((user) =>
      dispatch(
        setUserData({
          username: user.username,
          displayName: user.displayName,
          email: user.email,
          profilePic: user.profilePic,
          bio: user.bio,
        }),
      ),
    );
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
