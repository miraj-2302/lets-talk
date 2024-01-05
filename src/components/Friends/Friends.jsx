import React from 'react'
import profil from '../../assets/profil.png'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { activeChat } from '../../pages/slices/activeChatSlice';


const Friends = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const dispatch = useDispatch();
  const [friend, setFriend] = useState([])
  


  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(item.val().receiverid == data.uid || item.val().senderid == data.uid){
          arr.push({...item.val(), key:item.key});

        }

      })
      setFriend(arr)
    });

  }, [])

  const handleBlock =(item)=>{
     console.log(item, 'item');
     if(data.uid == item.senderid){
      set(push(ref(db, 'block/')),{
        block:item.receivername,
        blockid:item.receiverid,
        blockby:item.sendername,
        blockbyid:item.senderid
      }).then(()=>{
        remove(ref(db, 'friend/' + item.key))
      })
     }else{
      set(push(ref(db, 'block/')),{
        block:item.sendername,
        blockid:item.senderid,
        blockby:item.receivername,
        blockbyid:item.receiverid
      }).then(()=>{
        remove(ref(db, 'friend/' + item.key))
      })
     }
  }
  const handleMsgData =(item)=>{
    console.log(item, 'yes');
    if(data.uid == item.senderid){
      dispatch(activeChat({
        status:'single',
        id:item.receiverid,
        name:item.receivername
      }))
    }else{
      dispatch(activeChat({
        status:'single',
        id:item.senderid,
        name:item.sendername
      }))
    }
  }

  return (
   
    <div className='mt-[10px] ml-[43px]'>
      <div className='shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll'>
       <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px]'>
       <h3 className='text-[20px] font-poppins font-semibold text-black'>Friends List</h3>
       <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]'/>
       </div>
       <div className='mx-[20px]'>
        
       {
        friend.length == 0 ?
        <p>Data Emty</p>
        :
        friend.map((item)=>(
          <div onClick={()=>handleMsgData(item)} className='flex justify-between items-center pb-[28px] mt-[17px] border-b '>
          <div className='w-[80px] h-[80px]'>
          <img src={profil} alt="" />
          </div>
          <div>
            <h3 className='text-[18px] font-poppins font-semibold text-black'>
              {
                item.receiverid == data.uid ? item.sendername : item.receivername
              }
            </h3>
            <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>Hi Guys, Wassup!</p>
          </div>
          <button onClick={()=>handleBlock(item)} className='text-[20px] font-poppins font-semibold text-white bg-primary py-1 px-[25px] rounded-lg'>Block</button>
         </div>
        ))
       }

{/* <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b border-red-500'>
          <div className='w-[80px] h-[80px]'>
          <img src={profil} alt="" />
          </div>
          <div>
            <h3 className='text-[18px] font-poppins font-semibold text-black'>Friends Reunion</h3>
            <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>Hi Guys, Wassup!</p>
          </div>
          <button className='text-[20px] font-poppins font-semibold text-white bg-primary py-1 px-[25px] rounded-lg'>Join</button>
         </div> */}
         
          
       </div>
      </div>
    </div>
   
  )
  }

export default Friends
