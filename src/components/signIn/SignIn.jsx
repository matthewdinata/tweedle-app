// services
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, GoogleProvider } from '../../firebase';

// hooks
import { useAuth } from '../../hooks/useAuth';

// styles
import './SignIn.css';

// assets
import { FcGoogle } from 'react-icons/fc';

export default function SignIn() {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // yup schema
  const schema = yup
    .object({
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  // integrating yup validation and react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userData) => {
    setProcessing(true);
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      login(res.user.uid);
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
      login(res.user.uid);
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
      className='signin'
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type='email'
        placeholder='Enter email address'
        {...register('email')}
        className={errors.email ? 'input--invalid' : ''}
      />
      <input
        type='password'
        placeholder='Enter password'
        {...register('password')}
        className={errors.password ? 'input--invalid' : ''}
      />
      <button
        className={`signin__button ${processing ? 'cursor-not-allowed' : ''}`}
      >
        Sign In
      </button>
      <div className='signin__text-continue font-medium flex justify-between items-center mb-4'>
        <div className='continue-google__line h-px bg-white w-20'></div>
        or continue with
        <div className='continue-google__line h-px bg-white w-20'></div>
      </div>
      <button
        onClick={handleClick}
        className={`signin__button-continue ${
          processing ? 'cursor-not-allowed' : ''
        }`}
      >
        <FcGoogle className='h-6 w-auto' />
        Sign in with Google
      </button>
      {error && <span className='invalid-message'>{error.message}</span>}
    </form>
  );
}
