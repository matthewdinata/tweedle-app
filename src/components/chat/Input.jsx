import React from 'react';
import { FiImage } from 'react-icons/fi';

export default function Input() {
  return (
    <div className='flex items-center gap-x-4 px-4 pb-6'>
      <div className='relative flex flex-1'>
        <input
          type='text'
          placeholder='Type message..'
          className='flex flex-1 h-12 pl-4 mb-0 bg-opacity-10 text-sm font-normal'
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
