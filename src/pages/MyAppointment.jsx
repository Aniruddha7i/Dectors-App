import React from 'react';
import { doctors } from '../assets/assets_frontend/assets';

const MyAppointment = () => {
  return (
    <div className='md:w-[90%] md:m-auto max-md:mx-4 w-full'>
      <p className='font-medium text-zinc-700 pb-3 mt-12 border-b'>My appointments</p>
      <div>
        {doctors.slice(0,2).map((item,index)=>(
          <div key={index} className='gird grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='font-semibold text-neutral-800'>{item.name}</p>
              <p className='italic'>{item.speciality}</p>
              <p className='font-medium text-zinc-700 mt-1'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-neutral-700 text-sm font-medium'>Date & Time: </span> 25, July, 2024 |  8:30 PM</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-2'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-blue-100 hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-orange-100 hover:bg-red-400 hover:text-white transition-all duration-500'>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment