import React from 'react';
import PropTypes from 'prop-types';

export default function UserChat({ imgSrc, displayName, lastMessage }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-x-3 w-full bg-black-100 hover:bg-black-200 hover:bg-opacity-30 py-5 px-5'>
        <img
          src={imgSrc}
          className='rounded-full w-12 h-12'
        />
        <div className='flex flex-col justify-center ml-2'>
          <p className='text-white'>{displayName}</p>
          {lastMessage && (
            <p className='text-white opacity-50 text-sm'>{lastMessage}</p>
          )}
        </div>
      </div>
      <hr className='w-[300px] h-px bg-white border-0 opacity-10'></hr>
    </div>
  );
}

UserChat.propTypes = {
  displayName: PropTypes.string,
  imgSrc: PropTypes.string,
  lastMessage: PropTypes.string,
};
