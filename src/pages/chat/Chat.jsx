import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatArea from '../../components/chat/ChatArea';
import Loading from '../../components/Loading.jsx';
import Search from '../../components/chat/Search/Search';
import Chats from '../../components/chat/Chats';

export default function Chat() {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {loading && <Loading />}
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 flex px-32 py-10 h-screen'>
          <div className='flex flex-col h-full'>
            <Search />
            <Chats setLoading={setLoading} />
          </div>
          <ChatArea />
        </div>
      </div>
    </div>
  );
}
