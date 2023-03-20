import React from 'react';
import Logo from './logo/Logo';
import { FiHome, FiMessageSquare, FiUser } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className='py-10 ml-10 flex flex-col max-h-screen gap-28 max-w-xs sticky top-0'>
      <Logo />
      <div className='flex flex-col space-y-12 flex-1 px-2'>
        <div className='flex items-center space-x-5'>
          <FiHome
            color='#FFFFFF'
            size={'1.5rem'}
            strokeWidth={1.5}
          />
          <h2 className='text-xl text-white font-medium'>Home</h2>
        </div>
        <div className='flex items-center space-x-5'>
          <FiUser
            color='#FFFFFF'
            size={'1.5rem'}
            strokeWidth={1.5}
          />
          <h2 className='text-xl text-white font-medium'>Friends</h2>
        </div>
        <div className='flex items-center space-x-5'>
          <FiMessageSquare
            color='#AF67E6'
            size={'1.5rem'}
            strokeWidth={1.5}
          />
          <h2 className='text-xl text-purple font-medium'>Chats</h2>
        </div>
      </div>
      <div className='flex items-center space-x-5'>
        <FiUser
          color='#FFFFFF'
          size={'2rem'}
          strokeWidth={1.5}
        />
        <div className='flex flex-col'>
          <h3 className='text-sm text-white text-opacity-50'>Logged in as</h3>
          <h2 className='font-semibold text-white'>Matthew Dinata</h2>
        </div>
      </div>
    </div>
  );
}
