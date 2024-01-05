import React, { createRef, useState } from 'react'
import profil from '../../assets/profil.png'
import {AiFillMessage, AiOutlineHome,} from 'react-icons/ai'
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUpload } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import   Cropper  from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import {  useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { update, ref as dref, getDatabase } from 'firebase/database';
import { userLoginInfo } from '../../pages/slices/userSlice';



const Sideber = ({active}) => {
  const db = getDatabase();
  const data = useSelector (state=> state.userLoginInfo.userInfo);
  console.log(data);
  const dispatch = useDispatch();
const [image, setImage] = useState('');
const [cropdata, setCropData] = useState("");
const cropperRef = createRef ();
let [profilephoto, setProfilePhoto] = useState('')





  let [profileModel, setProfileModel] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate()


  const handleSignOut =()=> {
  signOut(auth).then(() => {
    dispatch(userLoginInfo (null))
    localStorage.removeItem('userLoginInfo')
    toast.success('Logoute Succesfully Done');
    setTimeout(() => {
      navigate('/')
    },3000 );
  }).catch((error) => {
    console.log(error.code);
  });
}
 
let handleprofileModel= ()=>{
  setProfileModel(true)
}

///imagecroper

const onChange = (e) => {
  console.log(e.target.files);
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
    files = e.dataTransfer.files;
  } else if (e.target) {
    files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
  };
  reader.readAsDataURL(files[0]);
};

const getCropData = () => {
  if (typeof cropperRef.current?.cropper !== "undefined") {
    setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    const storage = getStorage();
    const storageRef = ref(storage, auth. currentUser.uid);
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);

          // setProfilePhoto(downloadURL)
          console.log(downloadURL,'downlod Url');
          updateProfile(auth.currentUser, { 
            photoURL: downloadURL
          }).then(()=>{
            update(dref(db,'users/' + data.uid),{
              img:downloadURL,
            });
              
            
            setProfileModel(false);
            setImage('');
            setCropData('');
          })
        });
});

  }
};


  return (
   
   <>
  
   <div className='bg-primary h-full  rounded-lg pt-[38px]'>
     <ToastContainer
      position="top-center"
      autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
        rtl={false}
         pauseOnFocusLoss
          draggable
         pauseOnHover
         theme="dark"
          />
      <div className=' relative w-[96px] h-[96px] mx-auto rounded-full   overflow-hidden group'>

      <img src={data.photoURL}  alt="" className='w-full h-full' />
        <div onClick={handleprofileModel} className='w-0 h-full bg-[rgba(0,0,0,.4)] absolute top-0 left-0 rounded-full group-hover:w-full flex justify-center items-center '>
        <BiUpload className='text-white' />
        </div>
      </div>
      <h2 className=' font-bold text-white text-[20px] text-center '>{data.displayName}</h2>

      <div className={`relative py-[20px] after:absolute after:content-[""] ${active == 'home' && 'after:bg-white'} after:top-0 after:left-[25px] after:w-full after:h-full after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg mt-[30px] before:absolute before:content[""] before:bg-primary before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-lg`}>
      <Link to='/home'>
      <AiOutlineHome className={`text-5xl mx-auto ${active == 'home' ? 'text-primary' : 'text-white'} font-bold`} />
      </Link>
      </div>
     
      <div className={`relative py-[20px] after:absolute after:content-[""] ${active == 'msg' && 'after:bg-white'} after:top-0 after:left-[25px] after:w-full after:h-full after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg mt-[30px] before:absolute before:content[""] before:bg-primary before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-lg`}>
      <Link to='/msg'>
      <AiFillMessage className={`text-5xl mx-auto ${active == 'msg' ? 'text-primary' : 'text-white'} font-bold`} />
      </Link>
      </div>
     
      <div className={`relative py-[20px] after:absolute after:content-[""] ${active == 'notification' && 'after:bg-white'} after:top-0 after:left-[25px] after:w-full after:h-full after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg mt-[30px] before:absolute before:content[""] before:bg-primary before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-lg`}>
        <Link to='/notification'>
      <IoMdNotificationsOutline className={`text-5xl mx-auto ${active == 'notification' ? 'text-primary' : 'text-white'} font-bold`} />
        </Link>
      </div>
      <div className={`relative py-[20px] after:absolute after:content-[""] ${active == 'setting' && 'after:bg-white'} after:top-0 after:left-[25px] after:w-full after:h-full after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg mt-[30px] before:absolute before:content[""] before:bg-primary before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-lg`}>
        <Link to='/setting'>
      <FiSettings className={`text-5xl mx-auto ${active == 'setting' ? 'text-primary' : 'text-white'} font-bold`} />
        </Link>
      </div>
      <div className='mt-[100px]'>
      <TbLogout onClick={handleSignOut} className='text-5xl mx-auto text-white font-bold ' />
      </div>
    </div>
  
  {
    profileModel &&

    <div className='w-full h-screen bg-red-500 absolute top-0 left-0 z-[1] flex justify-center items-center '>
    <div className='w-[500px] bg-white rounded-2xl text-center p-10'>
      <h2 className='text-2xl font-bold font-pops mt-6'>Upload Your Image</h2>
        
         

         {
          image ?
          <div className='w-[120px] h-[120px] rounded-full mx-auto mb-5  overflow-hidden'>
          <div className="img-preview"style={{width:"100%", float:"left", height: "300px" }}></div>
         </div>
         :
         <div className='w-[120px] h-[120px] rounded-full mx-auto mb-5  overflow-hidden'>
          <img src={data.photoURL} alt="" />
         </div>
         }
         
        {
          image &&
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
        }
           <input onChange={onChange} type="file" className='mt-4 mx-auto block ' />
         

         
        

             <button onClick={getCropData} className='bg-primary py-3 px-2 text-white'>Upload</button>
          <button onClick={()=>setProfileModel(false)} className='bg-red-500 ml-5 mt-5 py-3 px-2 text-white'>Cancel</button>
             </div>
             </div>
            }
   
           </>

   
          )
         }

export default Sideber
