import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { motion } from 'framer-motion';

const MedicineList = () => {
    const { atoken, medicines, getMedicines } = useContext(AdminContext);

    useEffect(() => {
        if (atoken) {
            getMedicines();
        }
    }, [atoken]);

    return (
        <div className="m-5 max-h-[90vh] overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-4">All Medicines</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {medicines.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
                        className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
                        onClick={() => console.log('Clicked:', item._id)}
                    >
                        <div className="relative">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-44 object-cover"
                            />
                            {item.stock > 0 ? (
                                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                    In Stock
                                </span>
                            ) : (
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs py-1 px-2 rounded">
                                    Out of Stock
                                </span>
                            )}
                        </div>
                        <div className="p-4 flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-gray-800 truncate">
                                {item.name}
                            </h2>
                            <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                            <p className="text-sm text-gray-700 font-medium">₹{item.price}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MedicineList;
