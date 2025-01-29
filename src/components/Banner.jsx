import React from 'react'
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const Navigate = useNavigate();
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 md:w-[87%] m-auto'>
        {/* left side  */}
        <div className='md:w-1/2 flex flex-col justify-center items-start gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <div className='text-3xl md:text-4xl lg:text-5xl text-white font-montserrat leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br className='hidden sm:block' /> With 100+ Trusted Doctors</div>
            <button onClick={()=>Navigate('./login')} className='flex items-center justify-center gap-2 bg-yellow-50 rounded-full px-4 py-2 mt-2 text-sm hover:scale-105 transition-all duration-300'>Create account</button>
        </div>

        {/* right side  */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-[104%] rounded-lg' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner