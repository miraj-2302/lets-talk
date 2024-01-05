import React from 'react'
import Friends from '../../components/Friends/Friends'
import GroupList from '../../components/GroupList/GroupList'
import Sideber from '../../components/Sideber/Sideber'
import Notifications from '../../components/Notifications/Notifications'

const Notification = () => {
  return (
    <div className='flex'>
        
    <div className='w-[186px] '><Sideber active='notification'/></div>
    <div className='w-full'>
      <Notifications/>
    </div>
    {/* <div className='w-[800px]'>
      <ChatBox/>
    </div> */}
    
  </div>
  )
}

export default Notification
