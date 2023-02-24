import React from 'react'

export default function ChatBoxUser({ message }) {
  return (
    <div className='ml-auto'>
      <div className='flex flex-col items-end gap-y-1 px-8 max-w-md'>
        <p className='text-white text-sm bg-purple bg-opacity-40 p-3 rounded-lg rounded-br-none'>
          {message}
        </p>
        <p className='text-white opacity-50 text-xs'>15.36</p>
      </div>
    </div>
  )
}
