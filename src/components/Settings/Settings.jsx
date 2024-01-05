import React from 'react'
import { BsSearch } from 'react-icons/bs'

const Settings = () => {
  return (
    <div className='mt-[30] ml-[30px] mr-[30px]'>
      <div className='relative'>
          <input  type="search" placeholder='Search' className='text-[20px] font-medium text-[#3D3D3D] font-poppins bg-white rounded-full py-[26px] px-[55px] p-5 m-5 w-full h-[70px] shadow shadow-box outline-none border  ' />
           <BsSearch className='absolute top-[40px] left-[40px]   text-[25px]'/>
        </div>
    </div>
  )
}

export default Settings
