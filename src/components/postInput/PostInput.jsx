import React from 'react';

// hooks
import { useUser } from '../../hooks/useUser';
import { useUserData } from '../../hooks/useUserData';

// assets
import { BiImageAlt } from 'react-icons/bi';

export default function PostInput() {
  const { currentUser } = useUser();
  const { getUserData } = useUserData();

  console.log(getUserData(currentUser.uid));

  return (
    <div className='post-input w-[680px] h-[250px] bg-black-100 rounded-lg p-6'>
      <div className='post-input__container flex'>
        <img
          className='bg-red rounded-full w-10 h-10'
          src='..'
        ></img>
        <div className='container__profile flex flex-col items-start ml-5 justify-center'>
          <span className='text-white my-[-4px] font-medium'>TEST</span>
          <span className='text-white font-light text-xs'>@TEST</span>
        </div>
      </div>
      <textarea
        placeholder="What's on your mind?"
        className='post-input__input bg-black-100 text-white placeholder:text-opacity-50 text-sm my-4 w-full h-[80px] align-text-top resize-none outline-none'
      />
      <div className='post-input__submit flex justify-between items-center'>
        <button className='post-input__attach flex gap-2 items-center'>
          <BiImageAlt className='h-6 w-auto text-purple text-opacity-90 hover:text-opacity-100' />
          <span className='text-sm text-white'>IMG_9027.jpg</span>
        </button>
        <button className='post-input__button bg-purple text-white font-medium py-2 px-4 rounded-md bg-opacity-90 hover:bg-opacity-100 focus:bg-opacity-100 outline-none'>
          Post
        </button>
      </div>
    </div>
  );
}
