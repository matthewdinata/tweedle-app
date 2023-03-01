import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from '../../features/userSlice'

export default function Home() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const logoutOfApp = () => {
    // dispatch to the store with the logout action
    dispatch(logout())
    // sign out function from firebase
    signOut(auth)
  }
  return (
    <div className>
      <h1 className='text-white'>{user.uid}</h1>
      <button
        onClick={logoutOfApp}
        className='block border-none bg-purple bg-opacity-90 focus:bg-opacity-100 hover:bg-opacity-100 px-4 h-16 mb-4 font-medium rounded-lg text-white focus:outline-none transition-all ease-in-out duration-500'
      >
        Logout
      </button>
    </div>
  )
}
