import React from 'react'
import ChatBoxNonUser from './ChatBoxNonUser'
import ChatBoxUser from './ChatBoxUser'
import Input from './Input'

export default function ChatArea() {
  return (
    <div className='flex-1 flex flex-col bg-black-100 mx-5 rounded-lg overflow-hidden'>
      <div className='flex gap-x-3 w-full bg-black-300 bg-opacity-10 p-5'>
        <img
          src='https://randomuser.me/api/portraits/women/81.jpg'
          className='rounded-full w-12 h-12'
        />
        <div className='flex flex-col'>
          <p className='text-white font-semibold text-lg'>Gabrielle Nicole</p>
          <p className='text-white text-sm'>@gabriellenicole</p>
        </div>
      </div>
      <div className='flex flex-col gap-y-7 overflow-auto scrollbar-none py-5 mb-5 '>
        <ChatBoxNonUser />
        <ChatBoxUser message='Reference site about Lorem Ipsum, in giving information on its origins, as well as a random Lipsum generator.' />
        <ChatBoxNonUser />
        <ChatBoxUser message='Hi!' />
        <ChatBoxNonUser />
        <ChatBoxUser message='Hi!' />
        <ChatBoxNonUser />
        <ChatBoxUser message='Hi!' />
      </div>
      <Input />
    </div>
  )
}
