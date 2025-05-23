import React, { useContext, useState } from 'react';
import logo from '../assets/assets_admin/admin_logo.svg'
import profilePic from '../assets/assets_frontend/profile_pic.png';
import dropDown from '../assets/assets_frontend/dropdown_icon.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const Navigate = useNavigate();
  const [ShowMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext); // upto now.....
  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    Navigate('/login');
  }
  return (
    <div className='flex justify-between items-center text-sm py-4 mb-5 mx-2 border-b border-b-gray-400 md:w-[90%] md:mx-auto w-full'>
      {console.log('hi')}
      <img className='w-44 cursor-pointer' src={logo} alt="Logo" />

      <ul className='hidden md:flex items-center gap-5 font-medium'>
        <NavLink to={'/'}>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={'/doctors'}>
          <li className='py-1'>All Doctors</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={'/about'}>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={'/contact'}>
          <li className='py-1'>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {
          token && userData ? (
            <div className='flex items-center gap-2 group cursor-pointer relative'>
              {/* Profile Image */}
              {/* {console.log(userData)} */}
              <img
                className='w-8 h-8 rounded-full border border-gray-300'
                src={userData.image}
                alt="Profile"
              />
              {/* Dropdown Icon */}
              <img
                className='w-3 transition-transform duration-700 group-hover:rotate-180'
                src={dropDown}
                alt="Dropdown Icon"
              />

              {/* Dropdown Menu */}
              <div className='absolute top-full right-0 mt-2 hidden group-hover:block z-20'>
                <div className='min-w-48 bg-white shadow-lg rounded-lg p-3 flex flex-col gap-3'>
                  {/* Profile Option */}
                  <p
                    onClick={() => Navigate('/profile')}
                    className='hover:text-primary hover:bg-gray-100 cursor-pointer px-3 py-2 rounded-md transition-all duration-500'
                  >
                    My Profile
                  </p>
                  {/* Appointments Option */}
                  <p
                    onClick={() => Navigate('/my-appointments')}
                    className='hover:text-primary hover:bg-gray-100 cursor-pointer px-3 py-2 rounded-md transition-all duration-500'
                  >
                    My Appointments
                  </p>
                  {/* Logout Option */}
                  <p
                    onClick={logout}
                    className='hover:text-red-500 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded-md transition-all duration-500'
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>

          ) : (
            <button
              onClick={() => Navigate('/login')}
              className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
              Create Account
            </button>
          )
        }

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* Mobile menu */}
        <div className={`${ShowMenu ? 'fixed w-full' : 'w-0 h-0'} md:hidden top-0 right-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink to={'/'} onClick={() => setShowMenu(false)}>
              <p className='py-1 px-2 rounded-lg'>Home</p>
              {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' /> */}
            </NavLink>

            <NavLink to={'/doctors'} onClick={() => setShowMenu(false)}>
              <p className='py-1 px-2 rounded-lg'>All Doctors</p>
              {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' /> */}
            </NavLink>

            <NavLink to={'/about'} onClick={() => setShowMenu(false)}>
              <p className='py-1 px-2 rounded-lg'>About</p>
              {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' /> */}
            </NavLink>

            <NavLink to={'/contact'} onClick={() => setShowMenu(false)}>
              <p className='py-1 px-2 rounded-lg'>Contact</p>
              {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' /> */}
            </NavLink>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar