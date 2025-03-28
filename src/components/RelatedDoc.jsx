import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
const RelatedDoc = ({ docId, speciality }) => {
    const Navigate = useNavigate();
    const {doctors} = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);
    useEffect(() => {
        if (speciality && doctors.length > 0) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }

    }, [docId, speciality, doctors])
    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Related Doctors</h1>
            <p className='sm:w-1/3 text-sm text-center' >Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto justify-center items-center pt-5 gap-4 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        onClick={() => {
                            Navigate(`/appointment/${item._id}`);
                            scrollTo(0, 0);
                        }}
                        key={index}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                    >
                        <img className='bg-blue-50' src={item.profileImage} alt="" />

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
    )
}

export default RelatedDoc