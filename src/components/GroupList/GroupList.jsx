import React, { useEffect, useState } from 'react'
import profil from '../../assets/profil.png'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const GroupList = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [show,setShow] = useState(false);
  const [groupname, setgroupname] = useState('');
  const [grouptagname, setgrouptagname] = useState('');
  const [grouplist, setgrouplist] = useState([])
  const handleCreateGroupModel =() =>{
    setShow(!show)
  }

  const handleCreateGroup =()=>{
    console.log('okk');
    setgroupname('')
    setgrouptagname('')
    set(push(ref(db, 'groupe/')),{
      adminid: data.uid,
      adminname:data.displayName,
      groupname:groupname,
      grouptagname:grouptagname
    })
  }
  
  useEffect(() => {
    const mygroupRef = ref(db, 'groupe/');
    onValue(mygroupRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
       if(item.val().adminid != data.uid){
        arr.push(item.val());
       }


      })
      setgrouplist(arr)
    });

  }, [])

  return (
   
    <div className='mt-[10px] ml-[43px]'>
      <div className='shadow shadow-box rounded-[20px] h-[450px] overflow-y-scroll'>
       <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px]'>
       <h3 className='text-[20px] font-poppins font-semibold text-black'>Groupe List</h3>
       {
        show ? <button onClick={handleCreateGroupModel} className=' rounded-lg text-white bg-red-500 p-3 '>Go Back</button>
        :
        <button onClick={handleCreateGroupModel} className=' rounded-lg text-white bg-primary p-3 '>Creat Group</button>
       }
       </div>
       
       
        <div className='mx-[20px]'>
          {
             show ?
             <div>
               <input onChange={(e)=>setgroupname(e.target.value)} value={groupname} className='w-full border mt-5 border-[#b8b9ce] rounded-lg outline-none p-3 ' type="text" placeholder='Groupe Name' />
               {/* <input onChange={(e)=>setgrouptagname(e.target.value)} className='w-full border mt-5 border-[#b8b9ce] rounded-lg outline-none p-3 ' type="text" placeholder='Your Name' /> */}
               <input onChange={(e)=>setgrouptagname(e.target.value)} value={grouptagname} className='w-full border mt-5 border-[#b8b9ce] rounded-lg outline-none p-3 ' type="text" placeholder='Tag Name' />
               <button onClick={handleCreateGroup} className='bg-primary text-white w-full mt-5 p-3 rounded-lg'>Creat Now</button>
             </div>
             :
             <>
             {
              grouplist.length == 0 ?
              <p>Data Emty</p>
              :
              grouplist.map((item)=>(
                <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b '>
             <div className='w-[80px] h-[80px]'>
             <img src={profil} alt="" />
             </div>
             <div>
              <p>{item.adminname}</p>
               <h3 className='text-[18px]  font-poppins font-semibold text-black'>{item.groupname}</h3>
               <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>{item.grouptagname}</p>
             </div>
             <button className='text-[20px] font-poppins font-semibold text-white bg-primary py-1 px-[25px] rounded-lg'>Join</button>
            </div>
              ))
             }
             </>
          }
       
       </div>
       
      </div>
    </div>
   
  )
  }

export default GroupList
