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
    </form>
  )
}
