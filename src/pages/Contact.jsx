import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-10 text-gray-500'>
        <b>CONTACT <span className='text-gray-700 font-semibold'>US</span></b>
      </div>
      <div className='flex flex-col my-10 justify-center md:flex-row gap-10 mb-10 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>54709 Willms Station <br />
            Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Tel: (415) 555‑0132 <br /> Email: aniruddha.282003@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact