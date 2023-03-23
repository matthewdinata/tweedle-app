import React, { useState, useEffect } from 'react';

// styles
import './Edit.css';

// components
import Sidebar from '../../components/Sidebar';
import getProfileSchema from '../../utils/ProfileValidation';

// services
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

// firebase
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// hooks
import { useAuth } from '../../hooks/useAuth';

export default function Edit() {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [img, setImg] = useState(null);

  const { currentUserInfo, currentUid, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserInfo) {
      setImgUrl(currentUserInfo.profilePic);
    }
  }, [currentUserInfo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
  };

  // update Firestore Database for profile changes
  const onSubmit = async (userData) => {
    setProcessing(true);
    try {
      if (img) {
        const imgId = uuid();
        const storageRef = ref(storage, imgId);
        const uploadTask = uploadBytesResumable(storageRef, img);

        // wait for uploadTask to complete
        await uploadTask;
        // get URL for the uploaded file
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, 'users', currentUid), {
            username: userData.username,
            displayName: userData.displayName,
            bio: userData.bio,
            profilePic: downloadURL,
          });
        });
      } else {
        await updateDoc(doc(db, 'users', currentUid), {
          username: userData.username,
          displayName: userData.displayName,
          bio: userData.bio,
        });
      }
      login(currentUid);
      navigate('/');
    } catch (err) {
      setError(err);
      console.log(error?.message);
    }
    setProcessing(false);
  };

  // integrate React-Hook-Form with Yup validation
  const profileSchema = getProfileSchema(currentUserInfo);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(profileSchema),
  });
  const { errors } = formState;

  return (
    <div className='edit grid grid-cols-[20rem,auto]'>
      <Sidebar />
      <div className='edit__container flex flex-col justify-start items-center gap-2 my-12'>
        <div className='flex w-[420px] mb-8 object-cover'>
          <img
            className='bg-red rounded-full w-12 h-12 object-cover'
            src={imgUrl}
          ></img>
          <div className='container__profile flex flex-col gap-0 items-start ml-5 justify-center'>
            <span className='text-white my-[-4px] font-semibold text-lg'>
              {currentUserInfo.displayName}
            </span>
            <input
              type='file'
              accept='image/*'
              id='profileImage'
              className='hidden'
              onChange={handleFileChange}
            />
            <label htmlFor='profileImage'>
              <span className='text-purple text-opacity-90 font-light text-xs hover:text-opacity-100 transition-colors ease-in-out duration-500 cursor-pointer'>
                Change profile photo
              </span>
            </label>
          </div>
        </div>
        <form
          className='edit__form flex flex-col gap-[2.2rem]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={`form__container flex flex-col gap-2 ${
              errors.username ? 'form__container--invalid' : ''
            }`}
          >
            <h3 className='form__subtitle'>
              Username <span className='text-red'>*</span>
            </h3>
            <input
              type='text'
              name='username'
              placeholder='Enter username'
              defaultValue={currentUserInfo.username}
              {...register('username')}
            />
            <span className='invalid-message'>
              {errors.username ? errors.username.message : ''}
            </span>
          </div>
          <div
            className={`form__container flex flex-col gap-2 ${
              errors.displayName ? 'form__container--invalid' : ''
            }`}
          >
            <h3 className='form__subtitle'>
              Display name <span className='text-red'>*</span>
            </h3>
            <input
              type='text'
              name='displayName'
              placeholder='Enter display name'
              defaultValue={currentUserInfo.displayName}
              {...register('displayName')}
            />
            <span className='invalid-message'>
              {errors.displayName ? errors.displayName.message : ''}
            </span>
          </div>
          <div className='form__container flex flex-col gap-2'>
            <h3 className='form__subtitle'>Bio</h3>
            <textarea
              placeholder='Enter bio'
              className='form__textarea'
              maxLength='250'
              defaultValue={currentUserInfo.bio}
              {...register('bio')}
            />
          </div>
          <button
            className='bg-purple text-white font-medium w-20 h-10 py-2 px-4 text-sm rounded-md bg-opacity-90 enabled:hover:bg-opacity-100 transition-all ease-in-out duration-300 focus:bg-opacity-100 outline-none disabled:transition-none disabled:bg-opacity-70 disabled:text-opacity-70 disabled:cursor-not-allowed ml-auto mt-[-1.5rem]'
            disabled={processing}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
