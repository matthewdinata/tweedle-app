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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      email: e.target[0].value,
      password: e.target[1].value,
      confirmPassword: e.target[2].value,
      username: e.target[3].value
    };
    const isValid = await userSchema.isValid(formData);
    console.log(isValid);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email,
        username,
      }); 
    } 
    catch (error) {
      setError(true)
      console.log(error.message)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
    }
    catch (error) {
      setError(true)
      console.log(error.message)
    }
  }

  return (
    <form className='register' onSubmit={handleSubmit}>

      {/* register with Email/Password */}
      <input type='email' name='email' placeholder='Enter email address' />
      <input type='password' name='password' placeholder='Enter password' />
      <input type='password' name='confirmPassword' placeholder='Confirm password' />
      <input type='text' name='username' placeholder='Enter username' />
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
