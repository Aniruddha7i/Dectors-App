import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Doctors = () => {
  const Navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const applyFilter = () => {
    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality);
    }

    if (searchTerm) {
      filtered = filtered.filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (priceRange) {
      filtered = filtered.filter(doc => doc.fees >= priceRange[0] && doc.fees <= priceRange[1]);
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchTerm, priceRange]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='md:w-[87%] m-auto'>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 mx-2'>
        <div className='flex flex-col text-gray-600 gap-5 text-sm max-sm:w-[94vw] mx-auto'>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent hover:border-gray-400 transition-colors duration-200 shadow-sm focus:shadow focus:shadow-blue-100"
          />
          {/* <input
            type='range'
            min='0'
            max='2000'
            step='50'
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className='w-full'
          />
          <span className='text-xs'>Up to ₹{priceRange[1]}</span> */}

          {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map(spec => (
            <p
              key={spec}
              onClick={() => speciality === spec ? Navigate('/doctors') : Navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 p-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-blue-300 text-gray-600 shadow-lg' : 'shadow-md'}`}
            >
              {spec}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
              onClick={() => Navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            >
              <img className='bg-blue-50' src={item.profileImage} alt='' />
              <div className='p-4'>
                <div className='flex items-center text-sm gap-2 text-center text-green-500'>
                  <p className='w-2 h-2 rounded-full bg-green-500'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-sm text-gray-600'>{item.speciality}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
