import React from 'react'

// styles
import './Landing.css'

// assets
import LandingImage from "../../assets/landing-image.png"

// components
import Register from '../../components/register/Register'

export default function Landing() {

   return (
      <>
         <div className="landing w-[960px] m-auto">
            <div className='landing__navbar text-white mb-20 flex justify-end gap-8 font-semibold pr-8 pt-24'>
               <span>Sign In</span>
               <span>Register</span>
            </div>
            <div className="landing__container flex justify-between">
               <img className="landing__image h-[28rem] mb-10" src={LandingImage} />
               <div className="landing__form">
                  <Register />
               </div>
            </div>
         </div>
      </>
   )
}
