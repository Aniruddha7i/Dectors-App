import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const {atoken,setAToken} = useContext(AdminContext);
    const navigation = useNavigate();

    // controle logout
    const Logout = () =>{
        navigation('/');
        atoken && setAToken('');
        atoken && localStorage.removeItem('aToken');
    }
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 bg-white border-b'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border rounded-full px-2.5 py-0.5 border-gray-500 text-gray-600'>{atoken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={Logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
        </div>
    )
}

export default NavBar