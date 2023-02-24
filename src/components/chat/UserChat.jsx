import React from 'react'

export default function UserChat() {
  return (
    <div>
      <div className='flex gap-x-3 w-full'>
        <img
          src='https://randomuser.me/api/portraits/women/81.jpg'
          className='rounded-full w-12 h-12'
        />
        <div className='flex flex-col'>
          <p className='text-white'>Gabrielle Nicole</p>
          <p className='text-white opacity-50 text-sm'>
            Hello, how's your day?
          </p>
        </div>
      </div>
      <hr className='mt-5 h-[1.5px] bg-white border-0 opacity-20'></hr>
    </div>
  )
}
