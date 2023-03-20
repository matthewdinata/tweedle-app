import React from 'react';

export default function UserChat() {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-x-3 w-full bg-black-100 hover:bg-black-200 hover:bg-opacity-30 py-5 px-5'>
        <img
          src='https://randomuser.me/api/portraits/women/81.jpg'
          className='rounded-full w-12 h-12'
        />
        <div className='flex flex-col'>
          <p className='text-white'>Gabrielle Nicole</p>
          <p className='text-white opacity-50 text-sm'>
            Hello, how is your day?
          </p>
        </div>
      </div>
      <hr className='w-[300px] h-px bg-white border-0 opacity-10'></hr>
    </div>
  );
}
