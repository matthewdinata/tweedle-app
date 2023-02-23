import React from 'react'
import Sidebar from '../../components/Sidebar'
import Search from '../../components/chat/Search'

export default function Chat() {
  return (
    <div className='flex'>
      <Sidebar />
      <Search />
    </div>
  )
}
