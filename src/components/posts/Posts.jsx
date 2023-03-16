import React from 'react';

// assets
import { FiHeart } from 'react-icons/fi';

export default function Posts() {
  return (
    <div className='posts w-[680px] h-auto bg-black-100 rounded-lg p-6 flex flex-col gap-4'>
      <div className='posts__container flex justify-between items-start'>
        <div className='flex'>
          <img
            className='bg-red rounded-full w-10 h-10'
            src='..'
          ></img>
          <div className='container__profile flex flex-col items-start ml-5 justify-center'>
            <span className='text-white my-[-4px] font-medium text-base'>
              John Doe
            </span>
            <span className='text-white font-light text-xs'>@johndoe</span>
          </div>
        </div>
        <span className='text-white text-opacity-50 text-xs'>4m</span>
      </div>
      <div className='posts__container overflow-auto flex flex-col gap-4'>
        <span className='text-white text-sm'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
          perspiciatis atque eius repellat voluptas reiciendis. Tempora
          molestias quo expedita obcaecati perspiciatis consequuntur pariatur
          totam recusandae vero, quae, ratione consectetur sequi culpa aliquid,
          rerum molestiae ex sit?
        </span>
        <img
          src='https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt=''
          className='rounded-lg'
        />
      </div>
      <div className='posts__likes flex justify-end text-white text-sm text-opacity-75 font-medium items-center gap-2'>
        <span>189</span>
        <FiHeart className='text-xl' />
      </div>
    </div>
  );
}
