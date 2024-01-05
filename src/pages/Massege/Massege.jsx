import React from 'react'
import GroupList from '../../components/GroupList/GroupList'
import Sideber from '../../components/Sideber/Sideber'
import Friends from '../../components/Friends/Friends'
import ChatBox from '../../components/ChatBox/ChatBox'

const Massege = () => {
  return (
    <div className='flex'>
        
    <div className='w-[186px] '><Sideber active='msg'/></div>
    <div className='w-[450px]'>
      <GroupList/>
      <Friends/>
    </div>
    <div className='w-[800px]'>
      <ChatBox/>
    </div>
    
  </div>
  )
}

export default Massege
