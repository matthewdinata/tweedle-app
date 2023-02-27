// services
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

// styles
import './Register.css'

// assets
import { FcGoogle } from 'react-icons/fc'

// components
import { auth, db, GoogleProvider } from '../../firebase';
import { userSchema } from '../../utils/UserValidation';

export default function Register() {  
  const [error, setError] = useState(false)
  const [processing, setProcessing] = useState(false)

  // integrate React-Hook-Form with Yup validation
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { errors } = formState;

  // Email/Password sign in method
  const onSubmit = async (userData) => {
    setProcessing(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: userData.email,
        username: userData.username,
        displayName: userData.username,
        profilePic: undefined,
      }); 
    }
    catch (error) {
      setProcessing(false)
      setError(true)
      console.log(error.message)
    }
    setProcessing(false)
  };

  // Google sign in method
  const handleClick = async (e) => {
    e.preventDefault();
    setProcessing(true)
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
      console.log(res)
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: res.user.email,
        username: res.user.username,
        displayName: res.user.displayName,
        profilePic: res.user.photoURL,
      }); 
    }
    catch (error) {
      setProcessing(false)
      setError(true)
      console.log(error.message)
    }
    setProcessing(false)
  }

  return (
    <form className='register' onSubmit={handleSubmit(onSubmit)}>

      {/* register with Email/Password */}

      <div className={`register__container ${errors.email ? 'register__container--invalid' : ''}`}>
        <input type='email' name='email' placeholder='Enter email address' {...register('email')} />
        <span className="register__invalid-message">{errors.email ? errors.email.message : ""}</span>
      </div>

      <div className={`register__container ${errors.password ? 'register__container--invalid' : ''}`}>
        <input type='password' name='password' placeholder='Enter password' {...register('password')} />
        <span className="register__invalid-message">{errors.password?.message}</span>
      </div>

      <div className={`register__container ${errors.confirmPassword ? 'register__container--invalid' : ''}`}>
        <input type='password' name='confirmPassword' placeholder='Confirm password' {...register('confirmPassword')} />
        <span className="register__invalid-message">{errors.confirmPassword?.message}</span>
      </div>

      <div className={`register__container ${errors.username ? 'register__container--invalid' : ''}`}>
        <input type='text' name='username' placeholder='Enter username' {...register('username')} />
        <span className="register__invalid-message">{errors.username?.message}</span>
      </div>
      
      <button className='register__button'>Register</button>


      {/* continue with Google option */}

      <div className='register__text-continue font-medium flex justify-between items-center mb-4'>
        <div className='continue-google__line h-px bg-white w-20'></div>
        or continue with
        <div className='continue-google__line h-px bg-white w-20'></div>
      </div>
      <button className='register__button-continue' onClick={handleClick}>
        <FcGoogle className='h-6 w-auto' />
        Register with Google
      </button>

    </form>
  )
}
