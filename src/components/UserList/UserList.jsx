import React, { useEffect, useState } from 'react'
import profil from '../../assets/profil.png'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { BsSearch } from "react-icons/bs";


const UserList = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  console.log(data, 'data');
  const [userlists, setUserlists] = useState([])
  const [friendrequestList, setFriendrequestList] = useState([])
  const [friendList, setFriendList] = useState([])
 const [searchdata,setSearchdata]= useState([])
  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
       if (item.key != data.uid) {
        arr.push({...item.val(), userid: item.key});
       }
      })
      setUserlists(arr)
    });

  }, [])

  console.log(userlists);

  // console.log(userlist, 'userrrr');
   
  const handleFriendRequest = (item)=>{
    console.log('okk done', item);
    set(push (ref(db, 'friendrequest/')), {
      sendername: data.displayName,
      senderid: data.uid,
      receivername: item.username,
      receiverid: item.userid,
    });
  }

  useEffect(() => {
    const friendrequestRef = ref(db, 'friendrequest/');
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
         console.log(item.val());
          arr.push(item.val().receiverid+item.val().senderid);
        


      })
      setFriendrequestList(arr)
    });

  }, [])

  console.log(friendrequestList);
  
  ///component friend data

  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid+item.val().senderid);
      })
      setFriendList(arr)
    });

  }, [])
 
  const handleSearch =(e)=>{
    // console.log(e.target.value);
    let arr = []
    if(e.target.value.length == 0){
      setSearchdata([])
      console.log('okk');
    }
    else{
      userlists.map((item)=>{
        if((item.username.toLowerCase().includes(e.target.value.toLowerCase()))){
          arr.push(item);
          setSearchdata(arr)
          
        }
      })
    }
    
  }

  return (

    <div className='mt-[10px]  ml-[43px]'>
      <div className='shadow shadow-box rounded-[20px] h-[450px]  mb-5'>
        <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px] '>
          <h3 className='text-[20px] font-poppins font-semibold text-black'>User List</h3>
          <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
        </div>
        <div className='relative '>
          <input onChange={handleSearch} type="search" placeholder='Search' className='text-[16px] py-[26px] px-[55px] font-medium text-[#3D3D3D] font-poppins bg-white rounded-full p-5 ml-6   shadow shadow-box outline-none border  ' />
          <BsSearch className='absolute top-[30px] left-[42px]  text-[25px]'/>
           {/* <BsSearch className='absolute top-[20px] left-[23px] right-[385px] bottom-[20px] text-[25px]'/> */}
        </div>
        <div className='mx-[20px] h-[290px] mt-5  overflow-y-scroll '>

          {
            searchdata.length > 0 ?
            searchdata.map((item) => (
              <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b border-red-500'>
                <div className='w-[80px] h-[80px]'>
                  <img className=' rounded-full' src={item.img} alt="" />
                </div>
                <div>
                  <h3 className='text-[18px] font-poppins font-semibold text-black'>{item.username}</h3>
                  <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>{item.email}</p>
                </div>

                    {
                       friendList.includes(data.uid+item.userid) ||
                       friendList.includes(item.userid+data.uid)
                       ?
                       <button className='text-[14px] font-poppins font-semibold text-white bg-primary py-1 px-[20px] rounded-lg'>Friend</button>
                       :
                       friendrequestList.includes(data.uid+item.userid) ||
                       friendrequestList.includes(item.userid+data.uid)
                       ?
                       <button className='text-[14px] font-poppins font-semibold text-white bg-primary py-1 px-[20px] rounded-lg'>pending</button>
                       :
                       <button onClick={()=>handleFriendRequest(item)} className='text-[20px] font-poppins font-semibold text-white bg-primary py-1 px-[25px] rounded-lg'>+</button>
                    }                
               
                
                
              </div>
            ))
            :
            userlists.map((item) => (
              <div className='flex justify-between items-center pb-[28px] mt-[17px] border-b '>
                <div className='w-[80px]  h-[80px]'>
                  <img className=' rounded-full' src={item.img} alt="" />
                </div>
                <div>
                  <h3 className='text-[18px] font-poppins font-semibold text-black'>{item.username}</h3>
                  <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>{item.email}</p>
                </div>

                    {
                       friendList.includes(data.uid+item.userid) ||
                       friendList.includes(item.userid+data.uid)
                       ?
                       <button className='text-[14px] font-poppins font-semibold text-white bg-primary py-1 px-[20px] rounded-lg'>Friend</button>
                       :
                       friendrequestList.includes(data.uid+item.userid) ||
                       friendrequestList.includes(item.userid+data.uid)
                       ?
                       <button className='text-[14px] font-poppins font-semibold text-white bg-primary py-1 px-[20px] rounded-lg'>pending</button>
                       :
                       <button onClick={()=>handleFriendRequest(item)} className='text-[20px] font-poppins font-semibold text-white bg-primary py-1 px-[25px] rounded-lg'>+</button>
                    }                
               
                
                
              </div>
            ))
          }



        </div>
      </div>
    </div>

  )
}

export default UserList
