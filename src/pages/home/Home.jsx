import React from 'react'

// styles 
import "./Home.css"

// components
import Posts from '../../components/posts/Posts'
import PostInput from '../../components/postInput/PostInput'

export default function Home() {
  return (
    <div className="home">
      <div className="home__container flex flex-col items-center justify-center">
         <Posts />
         <PostInput />
      </div>
    </div>
  )
}
