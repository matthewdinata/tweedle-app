import React, { useEffect, useState } from 'react';
import { useChat } from '../../hooks/useChat';

// firebase
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import ChatBoxUser from './ChatBoxUser';

export default function Messages() {
  const { chatId } = useChat();
  const [messages, setMessages] = useState([]);

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
      {messages.map((message) => (
        <ChatBoxUser
          message={message.text}
          imgSrc={message.img}
          key={message.id}
        />
      ))}
    </div>
  );
}
