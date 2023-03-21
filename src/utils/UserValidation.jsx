import * as yup from 'yup';

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
});
