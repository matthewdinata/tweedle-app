import React from 'react'

export default function ChatBoxNonUser() {
  return (
    <div className='flex items-start max-w-xs'>
      <div className='flex flex-col items-center gap-y-1 px-8'>
        <img
          src='https://randomuser.me/api/portraits/women/81.jpg'
          className='rounded-full w-10 h-10'
        />
        <p className='text-white opacity-50 text-xs'>15.36</p>
      </div>
      <p className='text-white text-sm border border-white border-opacity-40 p-3 rounded-lg rounded-bl-none'>
        Hello, how's your day?
      </p>
    </div>
  )
}
