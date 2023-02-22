import React from 'react'
import './Register.css'

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
      <button className="register__button-continue">Sign in with Google</button>
    </form>
  )
}
