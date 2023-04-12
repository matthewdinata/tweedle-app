import React from 'react';
import Search from './search';
import Chats from './Chats';

// eslint-disable-next-line react/prop-types
export default function SideChat({ setLoading }) {
  return (
    <div className='flex flex-col h-full'>
      <Search />
      <Chats setLoading={setLoading} />
    </div>
  );
}
