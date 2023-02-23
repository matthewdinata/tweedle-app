import React from 'react'
import tweedleLogo from '../../assets/tweedleLogo.svg'
import './Logo.css'

export default function Logo() {
  return (
    <>
      <div className='logo'>
        <img className='w-9 h-9' src={tweedleLogo}></img>
        <h1 className='logo__title'>Tweedle</h1>
      </div>
    </>
  )
}
