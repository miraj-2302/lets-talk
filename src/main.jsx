import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/Registration/Registration.jsx';
import Login from './pages/Login/Login.jsx';
import firebaseConfig from './authentication/firebaseConfig.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import store from './store.jsx';
import { Provider } from 'react-redux';
import Massege from './pages/Massege/Massege.jsx';
import Setting from './pages/Setting/Setting.jsx';
import Notification from './pages/Notification/Notification.jsx';


const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration/> ,
  },
  {
    path: "/",
    element: <Login/> ,
  },
  {
    path: "/msg",
    element: <Massege/>,
  },
  {
    path: "/notification",
    element: <Notification/> ,
  },
  {
    path: "/setting",
    element: <Setting/>,
  },
  
  {
    path: "/home",
    element: <Home/> ,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword/> ,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)
