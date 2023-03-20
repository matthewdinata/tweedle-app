import React from 'react';

// components
import Posts from '../../components/post/Posts';
import PostInput from '../../components/post/PostInput';
import Sidebar from '../../components/Sidebar';

export default function Home() {
  return (
    <div className='home grid grid-cols-[20rem,auto]'>
      <Sidebar />
      <div className='home__container flex flex-col items-center justify-start gap-7 my-10'>
        <PostInput />
        <Posts />
      </div>
    </div>
  );
}
