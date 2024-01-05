import React, { useEffect, useState } from 'react'
import profil from '../../assets/profil.png'
import login from '../../assets/loging.png'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { TbTriangleFilled } from "react-icons/tb";
import ModalImage from 'react-modal-image';
import { IoIosSend } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { activeChat } from '../../pages/slices/activeChatSlice';
import moment from 'moment/moment';
import { FcGallery } from "react-icons/fc";
import { getDownloadURL, getStorage, ref as sref, uploadBytes } from "firebase/storage";
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";

const ChatBox = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const db = getDatabase();
    const storage = getStorage();
    const activeData = useSelector(state => state.activeChat.active);
    console.log(activeData);
    const [msg, setMsg] = useState("");
    const [singleMsg, setSingleMsg] = useState([])
    const [showEmoji, setShowEmoji] = useState('')

    const handleMsg = () => {
        setMsg('')
        if (activeData.status == 'single') {
            set(push(ref(db, 'singleMsg/')), {
                msg: msg,
                whosenderid: data.uid,
                whosendername: data.displayName,
                whoreceiverid: activeData.id,
                whoreceivername: activeData.name,
                date: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()} : ${new Date().getHours()},${new Date().getMinutes()}`
            });
        } else {
            console.log('ami groupe');
        }
    }

    useEffect(() => {
        const SingleMsgdRef = ref(db, 'singleMsg/');
        onValue(SingleMsgdRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                //   arr.push(item.val());
                if (
                    (item.val().whosenderid == data.uid && item.val().whoreceiverid == activeData.id)
                    || (item.val().whoreceiverid == data.uid && item.val().whosenderid == activeData.id)
                ) {
                    arr.push(item.val());
                }

            })
            setSingleMsg(arr)
        });

    }, [])

    const handleImg = (e) => {
        console.log(e.target.files[0]);
        const storageRef = sref(storage, 'some-child');

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
                set(push(ref(db, 'singleMsg/')), {
                    img: downloadURL,
                    whosenderid: data.uid,
                    whosendername: data.displayName,
                    whoreceiverid: activeData.id,
                    whoreceivername: activeData.name,
                    date: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()} : ${new Date().getHours()},${new Date().getMinutes()}`
                });
            });
        });

    }

    const handleEmoji =(emoji)=>{
      console.log(emoji.emoji,'miraj');
      setMsg(msg + emoji.emoji )
    }
   
    return (
        <div className='mt-[10px] h-full ml-[43px]'>
            <div className='shadow shadow-box rounded-[20px] p-5 h-sreen '>

                <div className='flex items-center justify-between border-b-2  pb-5'>
                    <div className='flex items-center'>
                        <img src={profil} alt="" />
                        <div className='ml-[30px]'>
                            <h3 className='text-[18px] font-poppins font-semibold text-[#000]'>
                                {activeData.name}
                            </h3>
                            <p className='text-[14px] font-poppins font-medium text-[#4D4D4D]'>Online</p>
                        </div>
                    </div>


                    <div>
                        <BiDotsVerticalRounded className='text-[25px] text-primary mr-[10px]' />
                    </div>
                </div>

                <div className='mt-8 overflow-y-scroll h-[700px] px-5'>
                    {
                        singleMsg.map((item) => (
                            item.whosenderid == data.uid ?

                                item.img ?
                                    <div className='text-right '>
                                        <div className='bg-primary p-3 inline-block rounded-lg'>

                                            <ModalImage
                                                small={item.img}
                                                large={item.img}
                                                className='w-60'
                                            />
                                        </div>
                                        <div>
                                            <p>
                                                {
                                                    moment(item.date, "YYYYMMDD hh:mm").fromNow()
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    :


                                    <div className='text-right '>
                                        <div className='relative inline-block px-[50px] py-[15px] bg-primary rounded-lg'>
                                            <p className='text-[18px] font-poppins font-semibold text-white'>
                                                {item.msg}
                                            </p>
                                            <TbTriangleFilled className='absolute bottom-[-3px] right-[-6px] text-primary text-2xl' />
                                        </div>
                                        <div>
                                            <p>
                                                {
                                                    moment(item.date, "YYYYMMDD hh:mm").fromNow()
                                                }
                                            </p>
                                        </div>
                                    </div>
                                :

                                item.img ?
                                    <div>
                                        <div className='bg-[#f1f1f1] p-3 inline-block rounded-lg'>

                                            <ModalImage
                                                small={item.img}
                                                large={item.img}
                                                className='w-60'
                                            />
                                            
                                        </div>
                                        <div>
                                            <p>
                                                {
                                                    moment(item.date, "YYYYMMDD hh:mm").fromNow()
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    <div className='w-60'>
                                        <div className='relative inline-block px-[50px] py-[15px] bg-[#F1F1F1] rounded-lg '>
                                            <p className='text-[18px] font-poppins font-semibold text-[#000]'>
                                                {item.msg}
                                            </p>
                                            <TbTriangleFilled className='absolute bottom-[-3px] left-[-6px] text-[#F1F1F1] text-2xl' />
                                        </div>
                                        <div>
                                            <p>
                                                {
                                                    moment(item.date, "YYYYMMDD hh:mm").fromNow()
                                                }
                                            </p>
                                        </div>
                                    </div>
                        ))
                    }
                    {/* RECEIVER MSG START */}
                    {/* <div className='w-[500px]'>
                   <div className='relative inline-block px-[50px] py-[15px] bg-[#F1F1F1] rounded-lg '>
                        <p className='text-[18px] font-poppins font-semibold text-[#000]'>
                            Lorem
                        </p>
                        <TbTriangleFilled className='absolute bottom-[-3px] left-[-6px] text-[#F1F1F1] text-2xl' />
                    </div>
                   </div> */}
                    {/* RECEIVER MSG END  */}


                    {/* SENDER MSG START */}
                    {/* <div className='text-right '>
                    <div className='relative inline-block px-[50px] py-[15px] bg-primary rounded-lg'>
                        <p className='text-[18px] font-poppins font-semibold text-white'>
                            Lorem
                        </p>
                        <TbTriangleFilled className='absolute bottom-[-3px] right-[-6px] text-primary text-2xl' />
                    </div>
                </div> */}
                    {/* SENDER MSG END  */}

                    {/* RECEIVER MSG START */}
                    {/* <div>
           <div className='bg-[#F1F1F1] p-3 inline-block rounded-lg'>
                
                <ModalImage
                 small={login}
                 large={login}
                 className='w-60'
                />
            </div>
           </div> */}
                    {/* RECEIVER MSG END */}

                    {/* SENDER MSG START */}
                    {/* <div className='text-right'>
            <div className='bg-primary p-3 inline-block rounded-lg'>
              
                <ModalImage
                 small={login}
                 large={login}
                 className='w-60'
                />
            </div>
            </div> */}
                    {/* SENDER MSG END */}

                </div>

                <div className='flex relative'>
                    <div>
                        <MdEmojiEmotions onClick={() => setShowEmoji(!showEmoji)} className='text-2xl text-primary absolute top-[35px] right-[100px]' />
                    </div>
                    {
                        showEmoji &&
                        <div className='absolute top-[-450px] right-0'>
                            <EmojiPicker onEmojiClick={(emoji)=> handleEmoji(emoji)} />
                        </div>
                    }
                    {/* <div>
                    <EmojiPicker/>
                   </div> */}
                    <label>
                        <input onChange={handleImg} type="file" className=' hidden' />
                        <FcGallery className='text-2xl absolute top-[35px] right-[65px]' />
                    </label>
                    <input onChange={(e) => setMsg(e.target.value)} value={msg}
                        type="text" className=' w-full mt-[25px] p-3 bg-[#F1F1F1] rounded-lg border-none outline-none' />

                    <div>
                        <button onClick={handleMsg}  className='p-3 bg-primary rounded-lg text-white ml-[15px] mt-[25px] text-[20px]'>
                            <IoIosSend />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatBox
