import React from 'react'
import UserChat from './UserChat'

export default function Chats() {
  return (
    <div className='flex flex-col gap-y-5 w-[320px] h-[650px] bg-black-100 p-6 rounded-lg'>
      <h2 className='font-medium text-white text-xl mb-5'>Chats</h2>
      <div className='flex flex-col gap-y-5 overflow-auto'>
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
      </div>
    </div>
  )
}
