import React, { useContext } from 'react'
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import NavBar from './component/NavBar';
const App = () => {

  // define a state variable
  const { atoken } = useContext(AdminContext);
  return atoken ? (
    <div className='bg-[#f8f9fd]'>
      <ToastContainer />
      <NavBar />
    </div>
  ):(
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App