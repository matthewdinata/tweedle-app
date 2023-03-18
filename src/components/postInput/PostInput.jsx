import React, { useEffect, useState } from 'react';

// assets
import { BiImageAlt } from 'react-icons/bi';

// hooks
import { useUser } from '../../hooks/useUser';
import { useUserData } from '../../hooks/useUserData';

// services
import { v4 as uuid } from 'uuid';

export default function PostInput() {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(null);

  // get complete user data from Firestore Database using useUserData hook
  const [user, setUser] = useState(null);
  const { currentUser } = useUser();
  const { getUserData } = useUserData();
  useEffect(() => {
    const getCompleteUser = async () => {
      const res = await getUserData(currentUser.uid);
      setUser(res);
    };
    getCompleteUser();
  }, []);

  return (
    <div className='post-input w-[680px] h-[250px] bg-black-100 rounded-lg p-6'>
      <div className='post-input__container flex'>
        <img
          className='bg-red rounded-full w-10 h-10'
          src={user?.profilePic}
        ></img>
        <div className='container__profile flex flex-col items-start ml-5 justify-center'>
          <span className='text-white my-[-4px] font-medium'>
            {user?.displayName}
          </span>
          <span className='text-white font-light text-xs'>
            @{user?.username}
          </span>
        </div>
      </div>
      <textarea
        value={text}
        placeholder="What's on your mind?"
        className='post-input__input bg-black-100 text-white placeholder:text-opacity-50 text-sm my-4 w-full h-[80px] align-text-top resize-none outline-none'
        onChange={(e) => setText(e.target.value)}
      />
      <div className='post-input__submit flex justify-between items-center'>
        <input
          type='file'
          accept='image/*'
          id='file'
          value={img}
          className='post-input__attach hidden'
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label
          htmlFor='file'
          className='flex gap-2 items-center'
        >
          <BiImageAlt className='h-6 w-auto text-purple text-opacity-90 hover:text-opacity-100' />
          <span className='text-sm text-white'>
            {img ? img.name : `Attach image`}
          </span>
        </label>
        <button className='post-input__button bg-purple text-white font-medium py-2 px-4 rounded-md bg-opacity-90 hover:bg-opacity-100 focus:bg-opacity-100 outline-none'>
          Post
        </button>
      </div>
    </div>
  );
}
