import React from 'react'
import './SignIn.css'

// assets
import { FcGoogle } from 'react-icons/fc'

export default function SignIn() {
  const handleSubmit = async (e) => {}

  return (
    <form className='signin' onSubmit={handleSubmit}>
      <input type='email' placeholder='Enter email address' />
      <input type='password' placeholder='Enter password' />
      <button className='signin__button'>Sign In</button>
      <div className='signin__text-continue font-medium flex justify-between items-center mb-4'>
        <div className='continue-google__line h-px bg-white w-20'></div>
        or continue with
        <div className='continue-google__line h-px bg-white w-20'></div>
      </div>
      <button className='signin__button-continue'>
        <FcGoogle className='h-6 w-auto' />
        Sign in with Google
      </button>
    </form>
  )
}
