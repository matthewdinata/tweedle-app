import React from 'react';

// components
import Sidebar from '../../components/Sidebar';

export default function Edit() {
  return (
    <div className='edit grid grid-cols-[20rem,auto]'>
      <Sidebar />
      <div className='edit__container'></div>
    </div>
  );
}
