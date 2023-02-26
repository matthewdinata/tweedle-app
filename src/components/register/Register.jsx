import React from 'react'
import './Register.css'

// assets
import { FcGoogle } from 'react-icons/fc'

// components
import { googleSignIn } from '../../firebase'

export default function Register() {  

  const handleClick = (e) => {
    e.preventDefault();
    googleSignIn();
  }

  return (
    <form className='register'>
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
