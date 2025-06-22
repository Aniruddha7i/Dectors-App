import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets'

function SideBar() {
    const { atoken } = useContext(AdminContext);
    return (
        <div className='min-h-screen bg-white border-r'>
            {
                atoken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({isActive})=>` transition-transform duration-500 ease-in-out flex items-center gap-3 px-3.5 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-violet-500 translate-x-0':''}`} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashbord</p>
                    </NavLink>
                    <NavLink className={({isActive})=>`flex items-center gap-3 px-3.5 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-violet-500':''}`} to={'/all-apointment'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink className={({isActive})=>`flex items-center gap-3 px-3.5 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-violet-500':''}`} to={'/add-doctor'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({isActive})=>`flex items-center gap-3 px-3.5 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-violet-500':''}`} to={'/doctor-list'}>
                        <img src={assets.people_icon} alt="" />
                        <p>Doctors List</p>
                    </NavLink>
                    <NavLink className={({isActive})=>`flex items-center gap-3 px-3.5 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-violet-500':''}`} to={'/add-medicine'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Medicines</p>
                    </NavLink>
                    <NavLink className={({isActive})=>`flex items-center gap-3 px-3.5 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-violet-500':''}`} to={'/medicine-list'}>
                        <img src={assets.people_icon} alt="" />
                        <p>ALL Medicines</p>
                    </NavLink>
                </ul>
            }

        </div>
    )
}

export default SideBar