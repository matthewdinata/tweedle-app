/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import 'firebase/firestore';

// eslint-disable-next-line react/prop-types
export default function ChatBoxNonUser({ message, imgSrc, date }) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className='flex items-start max-w-md mb-2'
    >
      <div className='flex flex-col items-start gap-y-1 px-8'>
        {message && (
          <p className='text-white text-sm bg-purple bg-opacity-40 p-3 rounded-lg max-w-md rounded-br-none'>
            {message}
          </p>
        )}
        {!message && (
          <img
            className='rounded-md'
            width={'60%'}
            src={imgSrc}
          ></img>
        )}
        <p className='text-white opacity-50 text-xs'>
          {date
            .toDate()
            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
