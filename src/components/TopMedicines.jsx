import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const TopMedicines = () => {
  const navigate = useNavigate();
  const { medicines } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Medicines</h1>
      <p className="sm:w-1/3 text-sm text-center">
        Explore our most popular and trusted medicines.
      </p>

      <div className="w-full grid grid-cols-auto pt-5 gap-4 gap-y-6 px-3 sm:px-0">
        {medicines.slice(0, 10).map((item, index) => (
          <motion.div
            key={item._id || index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
            onClick={() => navigate(`/medicine/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              className="bg-blue-50 w-full h-36 object-cover"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <p className="text-sm font-medium">₹{item.price}</p>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">{item.brand}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/medicines');
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default TopMedicines;