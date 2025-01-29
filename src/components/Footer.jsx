import React from 'react'
import { assets } from '../assets/assets_frontend/assets';
import { NavLink } from 'react-router-dom';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className='md:mx-10'>
            {/* upper part */}
            <div className='flex flex-col items-center sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>

                <div>
                    <h1 className='text-xl mb-5 font-medium'>COMPANY</h1>
                    <ul className='flex flex-col text-gray-600 gap-2 '>
                        <NavLink className='hover:underline cursor-pointer' to={'/'}>Home</NavLink>
                        <NavLink className='hover:underline cursor-pointer' to={'/about'}>About us</NavLink>
                        <NavLink className='hover:underline cursor-pointer' to={'/contact'}>Contact us</NavLink>
                        <NavLink className='hover:underline cursor-pointer' to={'/privacy policy'}>Privacy policy</NavLink>
                    </ul>
                </div>
                <div>
                    <h1 className='text-xl mb-5 font-medium'>GET IN TOUCH</h1>
                    <ul className='flex flex-col text-gray-600 gap-2 '>
                        <li className='hover:underline cursor-pointer'>+917865983243</li>
                        <li className='hover:underline cursor-pointer'>aniruddha@gmail.com</li>
                    </ul>
                </div>

            </div>
            <hr className='border-t border-gray-500 my-2'/>

            {/* Lower part */}
            <div className='flex justify-center text-gray-800 font-medium text-xs md:text-sm py-3 px-14 mb-2'>
                Copyright © {currentYear} - All Right Reserved.
            </div>
        </div>
    )
}

export default Footer