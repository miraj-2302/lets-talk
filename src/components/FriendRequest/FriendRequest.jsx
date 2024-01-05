import React, { useEffect } from 'react'
import profil from '../../assets/profil.png'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [friendrequest, setFriendrequest] = useState([])
  useEffect(() => {
    const friendrequestRef = ref(db, 'friendrequest/');
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (item.val().receiverid == data.uid) {
          arr.push({...item.val(), id: item.key});
        }


      })
      setFriendrequest(arr)
    });

  }, [])

  console.log(friendrequest, 'bhhhh');
     
  const handleAccept =(item)=>{
      console.log('okk cool', item);
      set(push(ref(db, 'friend/')),{
        ...item
      }).then(()=>{
        remove(ref(db, 'friendrequest/'))
      })
       
  }

    
   

  return (

    <div className='mt-[10px] ml-[43px]'>
      <div className='shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll'>
        <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px]'>
          <h3 className='text-[20px] font-poppins font-semibold text-black'>Friend Request</h3>
          <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
        </div>
        <div className='mx-[20px]'>

          {
            friendrequest.length == 0 ?
            <p>Data Emty</p>
            :
            friendrequest.map((item) => (
              <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b '>
                <div className='w-[80px] h-[80px]'>
                  <img src={profil} alt="" />
                </div>
                <div>
                  <h3 className='text-[18px] font-poppins font-semibold text-black'>{item.sendername}</h3>
                  <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>Hi Guys, Wassup!</p>
                </div>
                <button onClick={()=>handleAccept(item)} className='text-[20px] font-poppins font-semibold text-white bg-primary py-1 px-[25px] rounded-lg'>Accept</button>
              </div>
            ))
          }




        </div>
      </div>
    </div>

  )
}

export default FriendRequest
