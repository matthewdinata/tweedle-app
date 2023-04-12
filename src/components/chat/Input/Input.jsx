import React, { useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { useChat } from '../../../hooks/useChat';

// firebase
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../../firebase';

// firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// uuid
import { v4 as uuid } from 'uuid';

export default function Input() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const { currentUid } = useAuth();
  const { chatId, userChatWith } = useChat();

  const handleSend = async () => {
    setLoading(true);

    try {
      if (image) {
        const imageId = uuid();
        const storageRef = ref(storage, imageId);
        const uploadTask = uploadBytesResumable(storageRef, image);

        // upload image file in firebase storage
        await uploadTask;

        await getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadURL) => {
            await updateDoc(doc(db, 'chats', chatId), {
              messages: arrayUnion({
                id: imageId,
                text,
                senderId: currentUid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          },
        );
        setLoading(false);
        setImage(null);
      } else {
        await updateDoc(doc(db, 'chats', chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUid,
            date: Timestamp.now(),
          }),
        });
        setLoading(false);
        setText('');

        await updateDoc(doc(db, 'userChats', currentUid), {
          [chatId + '.lastMessage']: {
            text,
          },
          [chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', userChatWith.uid), {
          [chatId + '.lastMessage']: {
            text,
          },
          [chatId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center gap-x-4 px-4 pb-6'>
      <div className='relative flex flex-1'>
        <input
          type='text'
          placeholder='Type message..'
          className='flex flex-1 border-0 h-12 pl-4 mb-0 bg-opacity-10 text-sm font-normal bg-violet w-80 placeholder-white placeholder-opacity-50 px-10 rounded-lg outline-none text-white focus:ring-0 focus:border-2 focus:border-purple focus:border-opacity-40 focus:transition-colors focus:ease-in-out focus:duration-500'
          onChange={(e) => setText(e.target.value)}
          value={text || ''}
        ></input>
        <span className='absolute inset-y-0 right-4 flex items-center'>
          <input
            type='file'
            id='file'
            style={{ display: 'none' }}
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <label htmlFor='file'>
            <FiImage
              color={image ? '#AF67E6' : '#FFFFFF'}
              size='1.5rem'
              className='opacity-50 right-4'
            />
          </label>
        </span>
      </div>
      <button
        onClick={handleSend}
        disabled={(!text && !image) || loading}
        className='disabled:cursor-not-allowed disabled:bg-opacity-70 disabled:text-opacity-70 block border-none bg-purple bg-opacity-90 focus:bg-opacity-100 hover:bg-opacity-100 px-5 h-12 font-normal text-sm rounded-lg text-white transition-all ease-in-out duration-500'
      >
        Send
      </button>
    </div>
  );
}
