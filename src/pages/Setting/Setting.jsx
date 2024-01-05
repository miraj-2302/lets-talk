import React from 'react'
import Friends from '../../components/Friends/Friends'
import GroupList from '../../components/GroupList/GroupList'
import Sideber from '../../components/Sideber/Sideber'
import Settings from '../../components/Settings/Settings'

const Setting = () => {
  return (
    <div className='flex'>
        
    <div className='w-[186px] '><Sideber active='setting'/></div>
    <div className='w-full'>
      <Settings/>
    </div>
    {/* <div className='w-[800px]'>
      <ChatBox/>
    </div> */}
    
  </div>
  )
}

export default Setting
