import React, { useState } from 'react';

// styles
import './Edit.css';

// components
import Sidebar from '../../components/Sidebar';

export default function Edit() {
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className='edit grid grid-cols-[20rem,auto]'>
      <Sidebar />
      <div className='edit__container flex flex-col justify-start items-center gap-2 my-12'>
        <div className='flex w-[420px] mb-8'>
          <img
            className='bg-red rounded-full w-12 h-12'
            src='..'
          ></img>
          <div className='container__profile flex flex-col gap-1 items-start ml-5 justify-center'>
            <span className='text-white my-[-4px] font-semibold text-lg'>
              Gabrielle Nicole
            </span>
            <span className='text-purple font-light text-xs'>
              Change profile photo
            </span>
          </div>
        </div>
        <form className='edit__form flex flex-col gap-1'>
          <div className='form__container flex flex-col gap-2'>
            <h3 className='form__subtitle'>
              Username <span className='text-red'>*</span>
            </h3>
            <input
              type='text'
              name='username'
              placeholder='Enter username'
            />
          </div>
          <div className='form__container flex flex-col gap-2'>
            <h3 className='form__subtitle'>
              Display name <span className='text-red'>*</span>
            </h3>
            <input
              type='text'
              name='displayName'
              placeholder='Enter display name'
            />
          </div>
          <div className='form__container flex flex-col gap-2'>
            <h3 className='form__subtitle'>Bio</h3>
            <textarea
              value={bio}
              placeholder='Enter bio'
              className='form__textarea'
              maxLength='250'
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            className='bg-purple text-white font-medium w-20 h-10 py-2 px-4 text-sm rounded-md bg-opacity-90 enabled:hover:bg-opacity-100 transition-all ease-in-out duration-300 focus:bg-opacity-100 outline-none disabled:transition-none disabled:bg-opacity-70 disabled:text-opacity-70 disabled:cursor-not-allowed ml-auto'
            disabled={loading}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
