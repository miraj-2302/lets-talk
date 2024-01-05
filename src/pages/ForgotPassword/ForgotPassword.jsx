import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [emailerr, setEmailerr] = useState ('')

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailerr ('')
    }

    const handleSubmit = () => {
        console.log('okk cool');
      
       
        
        if(!email){
            setEmailerr('Email Is Requred') 
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailerr('Email Is Invalid');
            
        }
        
        if(email &&  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
         
            sendPasswordResetEmail(auth, email)
         .then(() => {
            setEmail('')
            toast.success('Your Password Hasben Reset')
        })
         .catch((error) => {
         const errorCode = error.code;
          console.log(errorCode);
     
         });
       
       
    }
     

      }

      
    


  return (
    
    <div className='h-screen w-full bg-primary flex justify-center items-center'>
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
     <div className='bg-white w-1/2 rounded p-5'>
        <h1 className=' font-open-sans font-bold font-[#11175D] text-[34px] '>Forgot Your Password</h1>
    
     <div className='relative mt-[40px] w-96'>
             <input onChange={handleEmail} value={email} className='w-full border-b border-[#b8b9ce] outline-none py-[26px] ' placeholder='Enter Your Email' type="email" />
             <p class="absolute top-[-8px] font-nunito font-semibold text-[#11175D] text-[14px] tracking-1px bg-white">Email Address</p>
            {
              emailerr &&
              <p className='font-nunito font-semibold bg-red-500 w-96 rounded p-[5px] mt-[5px] text-white'>{emailerr}</p>
            }
           </div>
          
          <div className='mt-[20px]'>
            
          <button onClick={handleSubmit} className='bg-primary rounded-lg font-nunito font-bold text-white text-[16px] p-5'>Reset</button>
            <button className='ml-[20px] bg-primary rounded-lg font-nunito font-bold text-white text-[16px] p-5'><Link to='/login'>Back To Login</Link></button>
           
          </div>
           
     </div>
    </div>
  )
}

export default ForgotPassword
