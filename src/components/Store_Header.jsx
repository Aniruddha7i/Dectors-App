import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import medi_1 from '../assets/assets_frontend/medi_1.webp'


const Store_Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-green-600 to-teal-500 rounded-xl px-6 md:px-10 lg:px-20 md:w-[87%] m-auto shadow-lg'>

            {/* Left side */}
            <div className='md:w-1/2 flex flex-col justify-center items-start gap-5 py-10 md:py-[8vw]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-snug'>
                    Buy Genuine Homeopathic & Allopathic Medicines Online
                </p>

                <div className='flex flex-col md:flex-row items-start md:items-center gap-3 text-white text-base font-light'>
                    <img className='w-24 md:w-28' src={assets.group_profiles} alt="Customer Trust" />
                    <p>
                        Trusted by thousands across India.<br className='hidden sm:block' />
                        Fast delivery and assured quality from top brands.
                    </p>
                </div>

                <a
                    className='flex items-center justify-center gap-2 bg-yellow-300 text-green-900 font-semibold rounded-full px-5 py-2.5 mt-4 text-sm hover:scale-105 transition-all duration-300 shadow-md'
                    href="#products"
                >
                    Shop Medicines
                    <img className='w-3' src={assets.arrow_icon} alt="Arrow" />
                </a>
            </div>

            {/* Right side */}
            <div className='md:w-1/2 relative flex justify-center items-center p-4'>
                <img
                    className='w-full md:w-[90%] md:absolute bottom-0 h-full object-contain rounded-xl'
                    src={medi_1}
                    alt="Medicines Banner"
                />
            </div>
        </div>

    )
}

export default Store_Header