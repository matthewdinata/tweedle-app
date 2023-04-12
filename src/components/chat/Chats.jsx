import React, { useEffect, useState } from 'react';
import UserChat from './UserChat';

// hooks
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { useUserData } from '../../hooks/useUserData';

//firebase
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

// eslint-disable-next-line react/prop-types
export default function Chats({ setLoading }) {
  const [completeChat, setCompleteChat] = useState([]);
  const { getUserData } = useUserData();
  const { currentUid } = useAuth();
  const { changeUser } = useChat();

  useEffect(() => {
    const getChats = () => {
      if (currentUid) {
        const unsub = onSnapshot(
          doc(db, 'userChats', currentUid),
          async (doc) => {
            let chatInfo = doc.data()
              ? Object.entries(doc.data())?.map((chat) => {
                  return chat[1];
                })
              : '';

            let userIdPromise = doc.data()
              ? Object.entries(doc.data())?.map((chat) => {
                  return getUserData(chat[1].userId);
                })
              : '';
            let userIdResponse = await Promise.all(userIdPromise);

            // combine userInfo and chatInfo into one state
            let tempChats = [];
            for (let i = 0; i < chatInfo.length; i++) {
              tempChats = [
                ...tempChats,
                { chatInfo: chatInfo[i], userInfo: userIdResponse[i] },
              ];
            }

            setCompleteChat(tempChats);
            setLoading(false);
          },
        );

        return unsub;
      }
    };

    return getChats();
  }, [currentUid]);

  const handleSelect = (userInfo) => {
    changeUser({ currentUid, user: userInfo });
  };

  return (
    <div className='flex-1'>
      <div className='flex flex-col gap-y-5 w-80 bg-black-100 py-6 rounded-lg overflow-auto scrollbar-none scrollbar-thumb-[#585858] scrollbar-thumb-rounded-md h-full'>
        <h2 className='font-medium text-white text-xl ml-5'>Chats</h2>
        <div className='flex flex-col items-center'>
          {completeChat?.length == 0 && (
            <p className='text-white text-opacity-60 py-auto'>
              No active chats :(
            </p>
          )}
          {completeChat
            ?.sort((a, b) => b.chatInfo.date - a.chatInfo.date)
            .map((chat) => {
              return (
                <UserChat
                  key={chat.userInfo.uid}
                  displayName={chat.userInfo.displayName}
                  imgSrc={chat.userInfo.profilePic}
                  lastMessage={chat.chatInfo.lastMessage?.text}
                  handleClick={() => handleSelect(chat.userInfo)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
