import * as yup from 'yup';

// firebase
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .email('You entered an invalid email format.')
    .required('Your email is required.'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .max(128, 'Password must be less than 128 characters.')
    .required('You must enter a valid password.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match.'),
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
