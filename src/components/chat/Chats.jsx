import React, { useEffect, useState } from 'react';
import UserChat from './UserChat';
import { useAuth } from '../../hooks/useAuth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUserData } from '../../hooks/useUserData';

export default function Chats() {
  const [completeChats, setCompleteChats] = useState(null);
  const { getUserData } = useUserData();
  const { currentUid } = useAuth();

  useEffect(() => {
    const getChats = () => {
      if (currentUid) {
        const unsub = onSnapshot(
          doc(db, 'userChats', currentUid),
          async (doc) => {
            console.log(doc.data());

            let userIdPromise = Object.entries(doc.data())?.map((chat) => {
              return getUserData(chat[1].userId);
            });
            let userIdResponse = await Promise.all(userIdPromise);
            setCompleteChats(userIdResponse);
          },
        );

        return unsub;
      }
    };

    return getChats();
  }, [currentUid]);

  console.log(completeChats);

  return (
    <div className='flex flex-col gap-y-5 w-80 bg-black-100 py-6 rounded-lg overflow-auto scrollbar-none scrollbar-thumb-[#585858] scrollbar-thumb-rounded-md h-full'>
      <h2 className='font-medium text-white text-xl ml-5'>Chats</h2>
      <div className='flex flex-col'>
        {completeChats?.map((chat) => {
          return (
            <UserChat
              key={chat.uid}
              displayName={chat.displayName}
              imgSrc={chat.profilePic}
            />
          );
        })}
      </div>
    </div>
  );
}
