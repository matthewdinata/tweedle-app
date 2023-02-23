import React from 'react'

// styles
import './Landing.css'

// assets
import LandingImage from '../../assets/landing-image.png'

// components
import Register from '../../components/register/Register'
import Logo from '../../components/logo/Logo'
import LandingIllustration from '../../assets/LandingIllustration.png'

export default function Landing() {
  return (
    <>
      <div className='landing'>
        <div className='landing__navbar'>
          <Logo />
          <div className='landing__navbar__link'>
            <a className='link-active'>Sign in</a>
            <a>Register</a>
          </div>
        </div>
        <div className='landing__container'>
          <img src={LandingIllustration} />
          <div className='landing__form'></div>
        </div>
      </div>
    </>
  )
}
