import React from 'react'
import UserChat from './UserChat'

export default function Chats() {
  return (
    <div className='flex flex-col gap-y-5 w-80 h-[650px] bg-black-100 py-6 px-5 rounded-lg'>
      <h2 className='font-medium text-white text-xl mb-5'>Chats</h2>
      <div className='flex flex-col gap-y-5 overflow-auto scrollbar-thin scrollbar-thumb-[#585858] scrollbar-thumb-rounded-md'>
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
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
