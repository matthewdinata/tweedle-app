import React, { useEffect, useState } from 'react';
import { useChat } from '../../hooks/useChat';

// firebase
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import ChatBoxUser from './ChatBoxUser';
import ChatBoxNonUser from './ChatBoxNonUser';
import { useAuth } from '../../hooks/useAuth';

export default function Messages() {
  const { chatId } = useChat();
  const [messages, setMessages] = useState([]);
  const { currentUid } = useAuth();

  // fetching messages from firebase
  useEffect(() => {
    if (!chatId) {
      return;
    }

    const unsub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [chatId]);

  return (
    <div>
      {messages.map((message) => {
        if (message.senderId == currentUid) {
          return (
            <ChatBoxUser
              message={message.text}
              imgSrc={message.img}
              date={message.date}
              key={message.id}
            />
          );
        } else {
          return (
            <ChatBoxNonUser
              message={message.text}
              imgSrc={message.img}
              date={message.date}
              key={message.id}
            />
          );
        }
      })}
    </div>
  );
}
