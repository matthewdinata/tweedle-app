import React from 'react'

// styles 
import "./Home.css"

// hooks
import { useUser } from '../../hooks/useUser'

// components
import Posts from '../../components/posts/Posts'
import PostInput from '../../components/postInput/PostInput'

export default function Home() {
  const { currentUser, logout } = useUser()
  return (
    <div className="home">
      <div className="home__container flex flex-col items-center justify-center">
         <Posts />
         <PostInput />
      </div>
      <h1 className='text-white'>{currentUser.uid}</h1>
      <button
        onClick={logout}
        className='block border-none bg-purple bg-opacity-90 focus:bg-opacity-100 hover:bg-opacity-100 px-4 h-16 mb-4 font-medium rounded-lg text-white focus:outline-none transition-all ease-in-out duration-500'
      >
        Logout
      </button>
    </div>
  )
}