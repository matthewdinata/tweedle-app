import * as yup from 'yup';

// firebase
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const profileSchema = yup.object().shape({
  username: yup
    .string()
    .required('You must enter a valid username.')
    .min(2, 'Username must be at least 2 characters.')
    .trim('Username cannot include leading and trailing spaces')
    .matches(
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
      'Username format is invalid.',
    )
    .test(
      'Unique username',
      'Username is already in use.',
      function checkUsernameAvailability(username) {
        const proposedUsername = username;
        const docRef = collection(db, 'users');
        const q = query(docRef, where('username', '==', proposedUsername));

        return getDocs(q).then((querySnap) => {
          let isUsernameAvailable = true;
          querySnap.forEach((doc) => {
            if (doc.data()) {
              isUsernameAvailable = false;
            }
          });
          return isUsernameAvailable;
        });
      },
    ),
  displayName: yup
    .string()
    .required('You must enter a display name.')
    .trim('Display name cannot include leading and trailing spaces'),
});
