import React from 'react'
import Search from './Search'
import Chats from './Chats'

export default function () {
  return (
    <div className='flex flex-col'>
      <Search />
      <Chats />
    </div>
  )
}
