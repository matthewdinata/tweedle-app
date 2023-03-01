import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Home() {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className>
      <h1 className='text-white'>{currentUser.email}</h1>
      <button
        onClick={() => signOut(auth)}
        className='block border-none bg-purple bg-opacity-90 focus:bg-opacity-100 hover:bg-opacity-100 px-4 h-16 mb-4 font-medium rounded-lg text-white focus:outline-none transition-all ease-in-out duration-500'
      >
        Logout
      </button>
    </div>
  )
}
