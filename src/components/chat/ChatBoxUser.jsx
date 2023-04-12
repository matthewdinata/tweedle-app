import React from 'react';
import PropTypes from 'prop-types';

export default function ChatBoxUser({ message, imgSrc }) {
  return (
    <div className='ml-auto'>
      <div className='flex flex-col items-end gap-y-1 px-8 mr-0'>
        {message && (
          <p className='text-white text-sm bg-purple bg-opacity-40 p-3 rounded-lg max-w-md rounded-br-none'>
            {message}
          </p>
        )}
        {!message && (
          <img
            width={'60%'}
            src={imgSrc}
          ></img>
        )}
        <p className='text-white opacity-50 text-xs'>15.36</p>
      </div>
    </div>
  );
}

ChatBoxUser.propTypes = {
  message: PropTypes.string,
  imgSrc: PropTypes.string,
};
