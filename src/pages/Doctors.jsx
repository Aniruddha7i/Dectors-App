import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doctors } from '../assets/assets_frontend/assets';
const Doctors = () => {
  const Navigate = useNavigate();
  // dynamic routing
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    }
    else setFilterDoc(doctors);
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div className='md:w-[87%] m-auto'>
      {/* top */}
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 mx-2'>
        {/* left side */}
        <div className='flex flex-col text-gray-600 gap-5 text-sm max-sm:w-[94wv] mx-auto'>
          <p onClick={() => speciality === 'General physician' ? Navigate('/doctors') : Navigate('/doctors/General physician')} className={`w-[94wv] sm:w-auto pl-3 p-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-blue-300 text-gray-600 shadow-lg' : 'shadow-md'}`}>General physician</p>

          <p onClick={() => speciality === 'Gynecologist' ? Navigate('/doctors') : Navigate('/doctors/Gynecologist')} className={`w-[94wv] sm:w-auto pl-3 p-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-blue-300 text-gray-600 shadow-lg' : 'shadow-md'}`}>Gynecologist</p>

          <p onClick={() => speciality === 'Dermatologist' ? Navigate('/doctors') : Navigate('/doctors/Dermatologist')} className={`w-[94wv] sm:w-auto pl-3 p-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-blue-300 text-gray-600 shadow-lg' : 'shadow-md'}`}>Dermatologist</p>

          <p onClick={() => speciality === 'Pediatricians' ? Navigate('/doctors') : Navigate('/doctors/Pediatricians')} className={`w-[94wv] sm:w-auto pl-3 p-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-blue-300 text-gray-600 shadow-lg' : 'shadow-md'}`}>Pediatricians</p>

          <p onClick={() => speciality === 'Neurologist' ? Navigate('/doctors') : Navigate('/doctors/Neurologist')} className={`w-[94wv] sm:w-auto pl-3 p-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-blue-300 text-gray-600 shadow-lg' : 'shadow-md'}`}>Neurologist</p>

          <p onClick={() => speciality === 'Gastroenterologist' ? Navigate('/doctors') : Navigate('/doctors/Gastroenterologist')} className={`w-[94wv] sm:w-auto pl-3 p-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-blue-300 text-gray-600 shadow-lg' : 'shadow-md'}`}>Gastroenterologist</p>
        </div>
        {/* right side */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => Navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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
      </div>
    </div>
  )
}

export default Doctors