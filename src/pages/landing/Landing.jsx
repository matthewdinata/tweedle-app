import React, { useState } from 'react';

// styles
import './Landing.css';

// assets
import LandingImage from '../../assets/landing-image.png';

// components
import Register from '../../components/register/Register';
import Logo from '../../components/logo/Logo';
import SignIn from '../../components/signIn/SignIn';

export default function Landing() {
  const [page, setPage] = useState('register');

  return (
    <>
      <div className='landing w-[960px] m-auto'>
        <div className='landing__navbar'>
          <Logo />
          <div className='landing__navbar__link'>
            <button
              onClick={() => setPage('signin')}
              className={page === 'signin' ? 'link--active' : ''}
            >
              Sign in
            </button>
            <button
              onClick={() => setPage('register')}
              className={page === 'register' ? 'link--active' : ''}
            >
              Register
            </button>
          </div>
        </div>
        <div className='landing__container flex justify-between items-center'>
          <img
            className='landing__image h-[28rem]'
            src={LandingImage}
          />
          <div className='landing__form py-auto'>
            {page === 'register' ? <Register /> : <SignIn />}
          </div>
        </div>
      </div>
    </>
  );
}
