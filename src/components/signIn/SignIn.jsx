// services
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, GoogleProvider } from '../../firebase'

// styles
import './SignIn.css'

// assets
import { FcGoogle } from 'react-icons/fc'

export default function SignIn() {
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()

  // yup schema
  const schema = yup
    .object({
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required()

  // integrating yup validation and react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (userData) => {
    setProcessing(true)
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password)
      navigate('/')
    } catch (error) {
      setProcessing(false)
      setError(error)
      console.log(error.message)
    }
    setProcessing(false)
  }

  // Google sign in method
  const handleClick = async (e) => {
    e.preventDefault()
    setProcessing(true)
    try {
      await signInWithPopup(auth, GoogleProvider)
      navigate('/')
    } catch (error) {
      setProcessing(false)
      setError(error)
      console.log(error.message)
    }
    setProcessing(false)
  }

  return (
    <form className='signin' onSubmit={handleSubmit(onSubmit)}>
      <input
        type='email'
        placeholder='Enter email address'
        {...register('email')}
      />
      <input
        type='password'
        placeholder='Enter password'
        {...register('password')}
      />
      <button className='signin__button'>Sign In</button>
      <div className='signin__text-continue font-medium flex justify-between items-center mb-4'>
        <div className='continue-google__line h-px bg-white w-20'></div>
        or continue with
        <div className='continue-google__line h-px bg-white w-20'></div>
      </div>
      <button onClick={handleClick} className='signin__button-continue'>
        <FcGoogle className='h-6 w-auto' />
        Sign in with Google
      </button>
    </form>
  )
}
