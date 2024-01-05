import React from 'react'
import profil from '../../assets/profil.png'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const BlockUser = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [blocklist, setBlocklist] = useState([])
 
  useEffect(() => {
    const blockRef = ref(db, 'block/');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        console.log(item.val());
        if(item.val().blockbyid == data.uid){
          arr.push({
            id:item.key,
            block:item.val().block,
            blockid:item.val().blockid
          })
        }else{
          arr.push({
            id:item.key,
            blockby:item.val().blockby,
            blockbyid:item.val().blockbyid
          })
        }
      })
      setBlocklist(arr)
    });

  }, [])

  const handleUnblock =(item)=>{
    console.log('okk', item);
    set(push(ref(db, 'friend/')),{
      sendername:item.block,
      senderid:item.blockid,
      receivername:data.displayName,
      receiverid:data.uid
    }).then(()=>{
      remove(ref(db, 'block/' +item.id))
    })
  }

  return (
   
    <div className='mt-[10px] ml-[43px]  '>
      <div className='shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll'>
       <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px]'>
       <h3 className='text-[20px] font-poppins font-semibold text-black'>Blocked Users</h3>
       <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]'/>
       </div>
       <div className='mx-[20px]'>

        {
          blocklist.length == 0 ?
          <p>Data Enty</p>
          :
          blocklist.map((item)=>(
            <div className='flex  items-center pb-[28px] mt-[17px] border-b border-red-500'>
          <div className='w-[80px] h-[80px]'>
          <img src={item.img} alt="" />
          </div>
          <div className='ml-[20px]'>
            <h3 className='text-[18px] font-poppins font-semibold text-black'>{item.block}</h3>
            <h3 className='text-[18px] font-poppins font-semibold text-black'>{item.blockby}</h3>
            <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>Hi Guys, Wassup!</p>
          </div>
          {
            !item.blockbyid &&
          <button onClick={()=>handleUnblock(item)} className='text-[20px] font-poppins font-semibold text-white bg-primary py-1 px-[25px] rounded-lg'>Unblock</button>
          
          }
         </div>
          ))
        }


        
    
       </div>
      </div>
    </div>
   
  )
  }

export default BlockUser
