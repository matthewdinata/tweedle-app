import React from 'react';

// hooks
import { useAuth } from '../../hooks/useAuth';

// components
import Posts from '../../components/posts/Posts';
import PostInput from '../../components/postInput/PostInput';
import Sidebar from '../../components/Sidebar';

export default function Home() {
  const { currentUid, logout } = useAuth();
  return (
    <div className='home grid grid-cols-[20rem,auto]'>
      <Sidebar />
      <div className='home__container flex flex-col items-center justify-start gap-7 my-10'>
        <PostInput />
        <Posts />
        <Posts />
      </div>
    </div>
  )
}
