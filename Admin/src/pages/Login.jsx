import React, { useState } from 'react'
import { assets } from '../assets/assets_admin/assets'
const Login = () => {

    const [state, setState] = useState('Admin');

    return (
        <form className="min-h-[80vh] flex item-center">
            <div className='flex flex-col gap-3 m-auto item-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg shadow-lg text-sm text-[#5E5E5E]'>
                <p className='text-2xl font-semibold m-auto'> <span className='text-primary'>{state}</span> Login </p>
                <div className='w-full'>
                    <p>Email:</p>
                    <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password:</p>
                    <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button className='bg-primary text-white rounded-md p-2 text-base w-full'>Login</button>
            </div>

        </form>
    )
}

export default Login;