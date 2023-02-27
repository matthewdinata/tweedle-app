import React, { useState } from 'react'

// styles
import './Register.css'

// assets
import { FcGoogle } from 'react-icons/fc'

// components
import { auth, db, GoogleProvider } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; 


export default function Register() {  
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value
    const password = e.target[1].value
    const username = e.target[2].value

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
      <input type='email' placeholder='Enter email address' />
      <input type='password' placeholder='Enter password' />
      <input type='text' placeholder='Enter username' /> {/* yup validation */}
      <button className='register__button'>Register</button>
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
