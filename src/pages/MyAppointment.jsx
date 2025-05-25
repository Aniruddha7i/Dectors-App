import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [numberOfAppointments, setNumberOfAppointments] = useState(3);
  const [moreOrLess, setMoreOrLess] = useState('More');

  const month = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const formatDate = (slotDate)=>{
    const date = slotDate.split('_');
    const year = date[2];
    const monthIndex = Number(date[1])-1; // Convert to zero-based index
    const day = date[0];
    return `${day} ${month[monthIndex]} ${year}`;
  }


// api call for appointment list
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

// api call for appointment cancell
  const cancellAppointment = async(appointmentId)=>{
    try{
      const { data } = await axios.post(backendUrl+'/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if(data.success){
        console.log('ok');
        toast.success(data.message);
        getAppointments();
      }else{
        toast.error(data.message);
      }

    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className='md:w-[90%] md:m-auto max-md:mx-4 w-full'>
      <p className='font-medium text-zinc-700 pb-3 mt-12 border-b'>My appointments</p>
      <div>
        {appointments.slice(0, numberOfAppointments).map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b rounded-md bg-white transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.profileImage} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='font-semibold text-neutral-800'>{item.docData.name}</p>
              <p className='italic'>{item.docData.speciality}</p>
              <p className='font-medium text-zinc-700 mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-neutral-700 text-sm font-medium'>Date & Time: </span> {formatDate(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-2'>
              {!item.cancelled &&  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-blue-100 hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>}
              {!item.cancelled && <button onClick={()=>cancellAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-orange-100 hover:bg-red-400 hover:text-white transition-all duration-500'>Cancel Appointment</button>}
              {item.cancelled && <span className='text-medium text-center sm:min-w-48 py-2 border border-black-1 rounded  text-red-500 transition-all duration-500'>Cancelled</span>}
              
            </div>
          </div>
        ))}
      </div>
       {appointments.length > 3 && (
        <div className='flex justify-center mt-4'>
          <button onClick={()=>{
            setNumberOfAppointments(numberOfAppointments===3? appointments.length : 3);
            setMoreOrLess(moreOrLess === 'More' ? 'Less' : 'More');
          }} className='text-sm px-4 py-2 border border-gray-300 rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300'>
            {moreOrLess}
          </button>
        </div>
      )}
    </div>
  )
}

export default MyAppointment