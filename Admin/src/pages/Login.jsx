import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    // state variable
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                // Admin state login request
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

                if (data.success) {
                    console.log(data.token);
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    toast.success("Login successful!");
                } else {
                    // This will catch any custom error messages sent by the backend with status 200
                    toast.error(data.message || "Invalid login credentials");
                }
            } else {
                // Handle Doctor state login here
            }
        } catch (error) {
            // Handle API errors (non-2xx responses)
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "An error occurred during login");
            } else {
                toast.error("Network error or server issue");
            }
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex item-center">
            <div className='flex flex-col gap-3 m-auto item-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg shadow-lg text-sm text-[#5E5E5E]'>
                <p className='text-2xl font-semibold m-auto'> <span className='text-primary'>{state}</span> Login </p>
                <div className='w-full'>
                    <p>Email:</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password:</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button className='bg-primary text-white rounded-md p-2 text-base w-full'>Login</button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>click here</span></p>
                        : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login;