import React from 'react'
import Sidebar from '../../components/Sidebar'
import Search from '../../components/chat/Search'
import Sidechat from '../../components/chat/Sidechat'
import ChatArea from '../../components/chat/ChatArea'

export default function Chat() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex mx-32 my-10'>
        <Sidechat />
        <ChatArea />
      </div>
    </div>
  )
}
