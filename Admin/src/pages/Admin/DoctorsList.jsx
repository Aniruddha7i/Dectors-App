import React, {useEffect,useContext} from 'react'
import { AdminContext } from '../../context/AdminContext';
const DoctorsList = () => {
  const {atoken, doctors, getAllDoctors, changeAvailability} = useContext(AdminContext);
  useEffect(()=>{
   if(atoken){
    getAllDoctors();
   }
  },[atoken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto '>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex flex-wrap w-full gap-4 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden group cursor-pointer' key={index}>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-300' src={item.profileImage} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-sm text-zinc-600'>{item.speciality}</p>
                <div className='flex mt-2 items-center gap-1 text-sm'>
                  <input className='cursor-pointer' onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList