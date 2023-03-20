import React from 'react';
import UserChat from './UserChat';

export default function Chats() {
  return (
    <div className='flex flex-col gap-y-5 w-80 bg-black-100 py-6 rounded-lg overflow-auto scrollbar-none scrollbar-thumb-[#585858] scrollbar-thumb-rounded-md h-full'>
      <h2 className='font-medium text-white text-xl ml-5'>Chats</h2>
      <div className='flex flex-col'>
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
      </div>
    </div>
  );
}
