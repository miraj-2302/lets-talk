import React, { useState } from 'react'
import login from '../../assets/loging.png'
import google from '../../assets/google.png'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'
import { Link, useNavigate, } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../slices/userSlice'


const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate('')
  const [email, setEmail] = useState('')
  const [emailerr, setEmailerr] = useState('')




  const [password, setPassword] = useState('')
  const [passworderr, setPassworderr] = useState('')
  const [showPassword, setShowPassword] = useState(false)



  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }



  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('')
  }


  const handleSubmit = () => {
    console.log('okk cool');


    if (!email) {
      setEmailerr('Email Is Requred')
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr('Email Is Invalid');

    }



    if (!password) {
      setPassworderr('password is requred')
    } else if (!/^(?=.*[a-z])/.test(password)) {
      setPassworderr('The string must contain at least 1 lowercase alphabetical character')
    } else if (!/^(?=.*[A-Z])/.test(password)) {
      setPassworderr('The string must contain at least 1 uppercase alphabetical character')
    } else if (!/^(?=.*[0-9])/.test(password)) {
      setPassworderr('The string must contain at least 1 numeric character')
    } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
      setPassworderr('The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict')
    } else if (!/^(?=.{8,})/.test(password)) {
      setPassworderr('The string must be eight characters or longer')
    }


    if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success('Login Successfully Done')
          dispatch(userLoginInfo(user.user))
          localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
          setEmail('')
          setPassword('')
          setTimeout(() => {
            navigate('/home')
          }, 3000)

        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode.includes('auth/invalid-login-credentials')) {

            toast.warn('Pleas Give Your Right Email & Password');
          }

        });

    }


  }

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setTimeout(() => {
          navigate('/home')
        })
      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

      });

  }


  return (
    <div className='flex justify-center  items-center'>
      <div className='w-1/2 flex justify-end mr-[69px] '>
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

        <div className=' justify-center items-center mx-auto'>
          <h1 className=' font-bold font-[#11175D] text-[34px] '>Login to your account!</h1>
          <img onClick={handleGoogleSignIn} className='mt-[30px]' src={google} alt="" />


          <div className='relative mt-[40px] w-96'>
            <input onChange={handleEmail} value={email} className='w-full text-[20px] border-b border-[#b8b9ce] outline-none py-[26px] ' placeholder='Enter Your Email' type="email" />
            <p class="absolute top-[-8px] font-nunito font-semibold text-[#11175D] text-[14px] tracking-1px bg-white">Email Address</p>
            {
              emailerr &&
              <p className='font-nunito font-semibold bg-red-500 w-96 rounded p-[5px] mt-[5px] text-white'>{emailerr}</p>
            }
          </div>




          <div className='relative mt-[40px] w-96'>
            <input onChange={handlePassword} value={password} className='w-full text-[20px] border-b border-[#b8b9ce] outline-none py-[26px]' placeholder='Enter Your Password' type={showPassword ? 'text' : 'password'} />
            <p class="absolute top-[-8px]  font-nunito font-semibold text-[#11175D] text-[14px] tracking-1px bg-white">Password</p>
            {
              showPassword ?
                <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[33px] right-[23px]' />
                :
                <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[33px] right-[23px]' />
            }

            {
              passworderr &&
              <p className='font-nunito font-semibold bg-red-500 w-96 rounded p-[5px] mt-[5px] text-white'>{passworderr}</p>
            }
          </div>

          <div className='w-96  mt-[40px]'>
            <div onClick={handleSubmit} className=' bg-primary text-center rounded-lg cursor-pointer'>
              <button className=' inline-block font-nunito font-semibold text-white text-[20px] py-[20px]'>Login to Continue</button>

            </div >
            <p className='font-open text-[#03014C] text-[13px] mt-[35px] text-center'>Don’t have an account ? <span className='font-open font-bold text-[#EA6C00] text-[13px]'><Link to='/registration'>Sign up</Link></span> </p>
            <p className='font-open font-bold text-[#EA6C00] text-[13px] mt-[20px] text-center'><Link to='/forgotpassword'>Forgot Password</Link></p>
          </div>

        </div>

      </div>
      <div className='w-1/2'>
        <img className='h-screen w-full object-cover' src={login} alt="" />
      </div>

    </div>
  )
}

export default Login
