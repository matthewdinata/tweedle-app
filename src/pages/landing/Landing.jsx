import React from 'react'

// styles
import './Landing.css'

// components
import Register from '../../components/register/Register'


export default function Landing() {
   return (
      <>
         <div className="landing">
            <div className='landing__navbar'></div>
            <div className="landing__container">
               <img/>
               <div className="landing__form">
                  <Register />
               </div>
            </div>
         </div>
      </>
   )
}
