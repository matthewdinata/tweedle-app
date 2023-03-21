import React from 'react';
import PropTypes from 'prop-types';

export default function UserList({ displayName, username, photoURL }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-x-3 w-full bg-black-100 hover:bg-violet hover:bg-opacity-5 py-5 px-5 rounded-lg'>
        {photoURL && (
          <img
            src={photoURL}
            className='rounded-full w-12 h-12'
            referrerPolicy='no-referrer'
          />
        )}
        {!photoURL && (
          <div className='relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-violet rounded-full dark:bg-gray-600'>
            <span className='font-medium text-gray-600 dark:text-gray-300'>
              {username.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div className='flex flex-col'>
          <p className='text-white'>{displayName}</p>
          <p className='text-white opacity-50 text-sm'>{username}</p>
        </div>
      </div>
    </div>
  );
}

UserList.propTypes = {
  displayName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
};
