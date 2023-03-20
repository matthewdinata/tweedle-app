
// services
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  query,
  getDocs,
  collection,
  where,
} from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// styles
import './Register.css';

// assets
import { FcGoogle } from 'react-icons/fc';

// components
import { auth, db, GoogleProvider } from '../../firebase';
import { userSchema } from '../../utils/UserValidation';


// assets
import { FcGoogle } from "react-icons/fc"

export default function Register() {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // integrate React-Hook-Form with Yup validation
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { errors } = formState;

  // check for username
  const getUsername = async (email) => {
    let proposedUsername = email.split('@')[0];
    let usernameFlag = true;

    while (usernameFlag) {
      usernameFlag = false;
      const q = query(
        collection(db, 'users'),
        where('username', '==', proposedUsername),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        usernameFlag = true;
        proposedUsername = proposedUsername + Math.floor(Math.random() * 100);
      });
    }
    return proposedUsername;
  };

  // Email/Password sign in method
  const onSubmit = async (userData) => {
    setProcessing(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );

      const validUsername = await getUsername(userData.email);
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        email: userData.email,
        username: validUsername,
        displayName: validUsername,
        profilePic: null,
        bio: '',
      });
      // make new doc for friends
      await setDoc(doc(db, 'friends', res.user.uid), {
        uid: res.user.uid,
        listOfFriends: [],
      });
      navigate('/');
    } catch (error) {
      setProcessing(false);
      setError(error);
      console.log(error.message);
    }
    setProcessing(false);
  };

  // Google sign in method
  const handleClick = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await signInWithPopup(auth, GoogleProvider);

      // before making a new doc, check if doc already exists to prevent updating the old doc
      const docRef = doc(db, 'users', res.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const validUsername = await getUsername(res.user.email);
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          email: res.user.email,
          username: validUsername,
          displayName: res.user.displayName,
          profilePic: res.user.photoURL,
          bio: '',
        });
        // make new doc for friends
        await setDoc(doc(db, 'friends', res.user.uid), {
          uid: res.user.uid,
          listOfFriends: [],
        });
      }
      navigate('/');
    } catch (error) {
      setProcessing(false);
      setError(error);
      console.log(error.message);
    }
    setProcessing(false);
  };

  return (

    <form
      className='register'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register with Email/Password */}

      <div
        className={`register__container ${
          errors.email ? 'register__container--invalid' : ''
        }`}
      >
        <input
          type='email'
          name='email'
          placeholder='Enter email address'
          {...register('email')}
        />
        <span className='register__invalid-message'>
          {errors.email ? errors.email.message : ''}
        </span>
      </div>

      <div
        className={`register__container ${
          errors.password ? 'register__container--invalid' : ''
        }`}
      >
        <input
          type='password'
          name='password'
          placeholder='Enter password'
          {...register('password')}
        />
        <span className='register__invalid-message'>
          {errors.password?.message}
        </span>
      </div>

      <div
        className={`register__container ${
          errors.confirmPassword ? 'register__container--invalid' : ''
        }`}
      >
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          {...register('confirmPassword')}
        />
        <span className='register__invalid-message'>
          {errors.confirmPassword?.message}
        </span>
      </div>

      <button
        className={`register__button ${processing ? 'cursor-not-allowed' : ''}`}
      >
        Register
      </button>

      {/* continue with Google option */}

      <div className='register__text-continue font-medium flex justify-between items-center mb-4'>
        <div className='continue-google__line h-px bg-white w-20'></div>
        or continue with
        <div className='continue-google__line h-px bg-white w-20'></div>
      </div>
      <button
        className={`register__button-continue ${
          processing ? 'cursor-not-allowed' : ''
        }`}
        onClick={handleClick}
      >
        <FcGoogle className='h-6 w-auto' />
        Register with Google
      </button>

      {error && (
        <span className='register__invalid-message text-red text-sm mt-2'>
          Something went wrong. {error.message}
        </span>
      )}

    </form>
  );
}
