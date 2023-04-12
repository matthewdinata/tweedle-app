import React from 'react';
import { FiImage } from 'react-icons/fi';

export default function Input() {
  return (
    <div className='flex items-center gap-x-4 px-4 pb-6'>
      <div className='relative flex flex-1'>
        <input
          type='text'
          placeholder='Type message..'
          className='flex flex-1 border-0 h-12 pl-4 mb-0 bg-opacity-10 text-sm font-normal bg-violet w-80 placeholder-white placeholder-opacity-50 px-10 rounded-lg text-white focus:ring-0 focus:border-2 focus:border-purple focus:border-opacity-40 focus:transition-colors focus:ease-in-out focus:duration-500'
        ></input>
        <span className='absolute inset-y-0 right-4 flex items-center'>
          <button>
            <FiImage
              color='#FFFFFF'
              size='1.5rem'
              className='opacity-50 right-4'
            />
          </button>
        </span>
      </div>
      <button className='block border-none bg-purple bg-opacity-90 focus:bg-opacity-100 hover:bg-opacity-100 px-5 h-12 font-normal text-sm rounded-lg text-white transition-all ease-in-out duration-500'>
        Send
      </button>
    </div>
  );
}
