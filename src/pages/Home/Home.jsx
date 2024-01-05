import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';
import Sideber from '../../components/Sideber/Sideber';
import { userLoginInfo } from '../slices/userSlice';
import GroupList from '../../components/GroupList/GroupList';

import Friends from '../../components/Friends/Friends';
import MyGroup from '../../components/MyGroup/MyGroup';
import UserList from '../../components/UserList/UserList';
import BlockUser from '../../components/BlockUser/BlockUser';
import FriendRequest from '../../components/FriendRequest/FriendRequest';

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const data = useSelector (state=> state.userLoginInfo.userInfo);
  const [verify, setVerify] = useState (false)
  
     useEffect(()=>{
      if(!data){
         navigate('/login')
      }
      },[])
   
      onAuthStateChanged(auth, (user) => {
       console.log();
       if(user.emailVerified){
        setVerify(true)
        dispatch(userLoginInfo (user))
          localStorage.setItem('userLoginInfo', JSON.stringify ((user)))
       }
      });
   
   
    return (
    <div>
    {
      verify ?
      <div className='flex'>
        
        <div className='w-[186px] '><Sideber active='home'/></div>
        <div className='w-[450px]'>
          <GroupList/>
          <FriendRequest/>
        </div>
        <div className='w-[450px]'>
          <Friends/>
          <MyGroup/>
        </div>
        <div className='w-[450px]'>
          <UserList/>
          <BlockUser/>
        </div>
      </div>
      :
      <div className='h-screen w-full bg-primary flex justify-center items-center'>
        <div className='bg-white rounded w-[700px] p-20'>
        <h1 className=' font-bold font-[#11175D] text-[34px] '>Please Verify your Email</h1>
        <button className='ml-[20px] mt-[30px] bg-green-500 rounded-lg font-nunito font-bold text-white text-[16px] p-5 '><Link to='/login'>Back To Login Page</Link></button>
        </div>
      </div>
    }
    </div>
  )
}

export default Home
