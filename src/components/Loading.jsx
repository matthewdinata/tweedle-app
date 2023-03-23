import React from 'react';
import { Spinner } from 'flowbite-react';

export default function Loading() {
  return (
    <div className='w-screen h-screen items-center justify-center flex flex-col gap-y-5 z-20'>
      <div className='w-28'>
        <Spinner
          aria-label='Default status example'
          size='100%'
          color='pink'
        />
      </div>
      <p className='text-white font-medium text-xl'>Loading...</p>
    </div>
  );
}
