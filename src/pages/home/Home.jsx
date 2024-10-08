import React from 'react';

// components
import Posts from '../../components/post/Posts';
import PostInput from '../../components/post/PostInput';
import Sidebar from '../../components/Sidebar';

// hooks
import { useAuth } from '../../hooks/useAuth';

export default function Home() {
  const { logout } = useAuth();
  return (
    <div className='home grid grid-cols-[20rem,auto]'>
      <Sidebar />
      <div className='home__container flex flex-col items-center justify-start gap-7 my-10'>
        <PostInput />
        <Posts />
        <button
          onClick={logout}
          className='block border-none bg-purple bg-opacity-90 focus:bg-opacity-100 hover:bg-opacity-100 px-4 h-16 mb-4 font-medium rounded-lg text-white focus:outline-none transition-all ease-in-out duration-500'
        >
          Logout
        </button>
      </div>
    </div>
  );
}
