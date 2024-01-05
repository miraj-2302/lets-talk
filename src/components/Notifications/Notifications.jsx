import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'

const Notifications = () => {
  return (
    <div className='mt-[30] ml-[30px] mr-[30px]'>
      <div className='relative'>
          <input  type="search" placeholder='Search' className='text-[20px] font-medium text-[#3D3D3D] font-poppins bg-white rounded-full py-[26px] px-[55px] p-5 m-5 w-full h-[70px] shadow shadow-box outline-none border  ' />
           <BsSearch className='absolute top-[40px] left-[40px]   text-[25px]'/>
        </div>
      <div className='shadow shadow-box rounded-[20px]  mb-5'>
        <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[20px]'>
          <h3 className='text-[20px] font-poppins font-semibold text-black'>Notification</h3>
          <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
        </div>
        
<div className='flex mt-[20px] mr-[30px] ml-[30px] border-b '>
<IoMdNotificationsOutline className='text-black text-[30px]'/>
<div className='ml-[10px]  h-[100px]'>
  <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
</div>
</div>

<div className='flex mt-[20px] mr-[30px] ml-[30px] border-b '>
<IoMdNotificationsOutline className='text-black text-[30px]'/>
<div className='ml-[10px] h-[100px]'>
  <p>So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through the skin, but no, it would not cause intoxication.</p>
</div>
</div>

<div className='flex mt-[20px] mr-[30px] ml-[30px] border-b '>
<IoMdNotificationsOutline className='text-black text-[30px]'/>
<div className='ml-[10px] h-[100px]'>
  <p>How a visual artist redefines success in graphic design</p>
</div>
</div>

<IoMdNotificationsOutline className='text-black text-[30px]'/>
<div className='flex mt-[20px] mr-[30px] ml-[30px] border-b '>
<div className='ml-[10px] h-[200px]'>
  <p>For athletes, high altitude produces two contradictory effects on performance. For explosive events (sprints up to 400 metres, long jump, triple jump) the reduction in atmospheric pressure means there is less resistance from the atmosphere and the athlete's performance will generally be better at high altitude.</p>
</div>
</div>
<div className='flex mt-[20px] mr-[30px] ml-[30px] border-b '>
<IoMdNotificationsOutline className='text-black text-[30px]'/>

<div className='ml-[10px] h-[100px]'>
  <p>consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue</p>
</div>
</div>

<IoMdNotificationsOutline className='text-black text-[30px]'/>
<div className='flex mt-[20px] mr-[30px] ml-[30px] border-b '>
<div className='ml-[10px] h-[80px]'>
  <p>In fermentum posuere urna nec</p>
</div>
</div>

<div className='flex mt-[20px] mr-[30px] ml-[30px] border-b '>
<IoMdNotificationsOutline className='text-black text-[30px]'/>
<div className='ml-[10px] h-[80px]'>
  <p>ID: 22739</p>
</div>
</div>

<div className='flex mt-[20px] mr-[30px] ml-[30px] border-b '>
<IoMdNotificationsOutline className='text-black text-[30px]'/>
<div className='ml-[10px] h-[80px]'>
  <p>How We Keep Brand Consistency in Our Visual Language — A Design System for Illustrations</p>
</div>
</div>

        </div>
    </div>
  )
}

export default Notifications
