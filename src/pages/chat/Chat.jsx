import React from 'react'
import Sidebar from '../../components/Sidebar'
import Search from '../../components/chat/Search'
import Chats from '../../components/chat/Chats'

export default function Chat() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex'>
        <Search />
        <Chats />
      </div>
    </div>
  )
}
