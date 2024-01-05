import React, { useEffect, useState } from 'react'
import profil from '../../assets/profil.png'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getDatabase, onValue,push , ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const MyGroup = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [mygroup, setmygroup] = useState([])
 
 
  useEffect(() => {
    const mygroupRef = ref(db, 'groupe/');
    onValue(mygroupRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
       if(item.val().adminid == data.uid){
        arr.push(item.val());
       }


      })
      setmygroup(arr)
    });

  }, [])
  return (
   
    <div className='mt-[10px] ml-[43px]'>
      <div className='shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll'>
       <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px]'>
       <h3 className='text-[20px] font-poppins font-semibold text-black'>My Group</h3>
       <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]'/>
       </div>
       <div className='mx-[20px]'>
        
       {
        mygroup.length == 0 ?
        <p>Data Emty</p>
        :
        mygroup.map((item)=>(
          <div className='flex  items-center pb-[28px] mt-[17px] border-b '>
          <div className='w-[80px] h-[80px]'>
          <img src={profil} alt="" />
          </div>
          <div className='ml-[30px]'>
            <p>{item.adminname}</p>
            <h3 className='text-[18px] font-poppins font-semibold text-black'>{item.groupname}</h3>
            <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>{item.grouptagname}</p>
          </div>
          {/* <button className='text-[20px] font-poppins font-semibold text-white bg-primary py-1 px-[25px] rounded-lg'>Join</button> */}
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

export default MyGroup
