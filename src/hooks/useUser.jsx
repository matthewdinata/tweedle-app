import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/userSlice';

// firebase
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';

export const useUser = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const loginHelper = () => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          }),
        );
      } else {
        dispatch(logout());
      }
    });
  };

  const logoutHelper = () => {
    // dispatch to the store with the logout action
    dispatch(logout());
    // sign out function from firebase
    signOut(auth);
  };

  return { currentUser: user, login: loginHelper, logout: logoutHelper };
};
