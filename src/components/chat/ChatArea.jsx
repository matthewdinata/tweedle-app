import React from 'react';
import Input from './Input/Input';
import { FiUsers } from 'react-icons/fi';
import { useChat } from '../../hooks/useChat';
import Messages from './Messages';

export default function ChatArea() {
  const { chatId, userChatWith } = useChat();

  // when user has not choose any chat
  if (!chatId) {
    return (
      <div className='flex-1 flex flex-col gap-y-5 items-center justify-center bg-black-100 mx-5 rounded-lg overflow-hidden'>
        <div className=' text-white text-lg text-opacity-60'>
          <p>Choose your friend to start a conversation</p>
        </div>
        <FiUsers
          size={'2rem'}
          color='#FFFFFF'
          opacity={'60%'}
        />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col justify-between bg-black-100 mx-5 rounded-lg overflow-hidden'>
      <div className='flex gap-x-3 w-full bg-black-300 bg-opacity-10 p-5'>
        <img
          src={userChatWith.profilePic}
          className='rounded-full w-12 h-12'
        />
        <div className='flex flex-col'>
          <p className='text-white font-semibold text-lg'>
            {userChatWith.displayName}
          </p>
          <p className='text-white text-sm'>{userChatWith.username}</p>
        </div>
      </div>
      <div className='flex flex-col gap-y-7 flex-1 overflow-auto scrollbar-none py-5 mb-5 '>
        <Messages />
      </div>
      <Input />
    </div>
  );
}
