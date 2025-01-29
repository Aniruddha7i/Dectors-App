import React from 'react'
import { doctors } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const TopDoctors = () => {
  const Navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-sm text-center' >Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full grid grid-cols-auto pt-5 gap-4 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={()=>Navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
            <img className='bg-blue-50' src={item.image} alt="" />

            <div className='p-4'>

              <div className='flex items-center text-sm gap-2 text-center text-green-500'>
                <p className='w-2 h-2 rounded-full bg-green-500'></p>
                <p>Available</p>
              </div>

              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.speciality}</p>

            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{Navigate('/doctors');scrollTo(0,0);}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
    </div>
  )
}

export default TopDoctors