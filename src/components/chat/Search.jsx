import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function Search() {
  return (
    <div className='search'>
      <label className='relative block'>
        <span class='absolute inset-y-0 left-0 flex items-center pl-6 pt-8'>
          <FiSearch color='#FFFFFF' size={'1.5rem'} className='opacity-50' />
        </span>
      </label>
      <input
        type='text'
        placeholder='Search chats..'
        className='pl-16 font-normal'
      />
    </div>
  )
}
