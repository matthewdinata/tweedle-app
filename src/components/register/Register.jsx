import React from 'react'

// styles
import './Register.css'

// components

// assets
import { FcGoogle } from "react-icons/fc"

export default function Register() {

  const handleSubmit = async (e) => {

  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <input type="email" placeholder="Enter email address" />
      <input type="password" placeholder="Enter password" />
      <input type="text" placeholder="Enter username" /> {/* yup validation */}
      <button className="register__button">Register</button>
      <div className="register__text-continue font-medium flex justify-between items-center mb-4">
        <div className="continue-google__line h-px bg-white w-20"></div>
        or continue with
        <div className="continue-google__line h-px bg-white w-20"></div>
      </div>
      <button className="register__button-continue flex items-center justify-center gap-3 font-medium"><FcGoogle className="h-6 w-auto"/>Sign in with Google</button>
    </form>
  )
}
