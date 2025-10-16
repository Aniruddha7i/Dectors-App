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

  // Helper function to format the date string from "dd_mm_yyyy" to "dd Mon yyyy"
  const formatDate = (slotDate) => {
    const dateParts = slotDate.split('_');
    const day = dateParts[0];
    const monthIndex = Number(dateParts[1]) - 1; // Convert to zero-based index for the month array
    const year = dateParts[2];
    return `${day} ${month[monthIndex]} ${year}`;
  }

  // API call to fetch the user's appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        // Reverse the array to show the most recent appointments first
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments.");
    }
  }

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  // API call to cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getAppointments(); // Refresh the list after cancelling
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel the appointment.");
    }
  }

  // API call for payment using Razorpay
  const payRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } });
      if (data.success) {
        // You would typically handle the Razorpay checkout modal here
        console.log('Razorpay order created:', data.order);
        toast.success('Redirecting to payment...');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment initiation failed.");
    }
  }

  return (
    <div className='md:w-[90%] md:m-auto max-md:mx-4 w-full'>
      <p className='font-medium text-zinc-700 pb-3 mt-12 border-b'>My Appointments</p>
      <div>
        {appointments.length > 0 ? (
          appointments.slice(0, numberOfAppointments).map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b rounded-md bg-white transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
              {/* Doctor Image */}
              <div>
                <img className='w-32 h-32 object-cover bg-indigo-50' src={item.docData.profileImage} alt="Doctor" />
              </div>

              {/* Appointment Details */}
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='font-semibold text-neutral-800'>{item.docData.name}</p>
                <p className='italic'>{item.docData.speciality}</p>
                
                {/* Appointment Type Badge */}
                <p className={`font-semibold text-xs mt-1 ${item.appointmentType === 'Online' ? 'text-blue-600' : 'text-green-600'}`}>
                  Type: {item.appointmentType} Checkup
                </p>

                <p className='font-medium text-zinc-700 mt-1'>Address:</p>
                {/* Conditional Address Display */}
                {item.appointmentType === 'Online' ? 
                  <p className='text-xs'>This is an online consultation.</p> :
                  <>
                    <p className='text-xs'>{item.docData.address.line1}</p>
                    <p className='text-xs'>{item.docData.address.line2}</p>
                  </>
                }
                
                <p className='text-xs mt-1'>
                  <span className='text-neutral-700 text-sm font-medium'>Date & Time: </span> 
                  {formatDate(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              
              {/* Spacer */}
              <div className='hidden sm:block'></div>

              {/* Action Buttons */}
              <div className='flex flex-col justify-end gap-2'>
                {/* Join Meeting Button (Only for Online & Not Cancelled) */}
                {item.appointmentType === 'Online' && !item.cancelled &&
                  <a href={item.meetingLink} target="_blank" rel="noopener noreferrer">
                    <button className='text-sm text-white text-center w-full sm:min-w-48 py-2 border rounded bg-green-500 hover:bg-green-600 transition-all duration-300'>
                      Join Meeting
                    </button>
                  </a>
                }
                
                {/* Action buttons appear only if not cancelled */}
                {!item.cancelled && (
                  <>
                    <button onClick={() => payRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-blue-100 hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>
                    <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-orange-100 hover:bg-red-400 hover:text-white transition-all duration-500'>Cancel Appointment</button>
                  </>
                )}
                
                {/* Cancelled Badge */}
                {item.cancelled && 
                  <span className='font-medium text-center sm:min-w-48 py-2 border rounded text-red-500 transition-all duration-500'>
                    Cancelled
                  </span>
                }
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-zinc-500 mt-8'>You have no appointments booked.</p>
        )}
      </div>

      {/* Show More/Less Button */}
      {appointments.length > 3 && (
        <div className='flex justify-center mt-4'>
          <button 
            onClick={() => {
              setNumberOfAppointments(numberOfAppointments === 3 ? appointments.length : 3);
              setMoreOrLess(moreOrLess === 'More' ? 'Less' : 'More');
            }} 
            className='text-sm px-4 py-2 border border-gray-300 rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300'
          >
            Show {moreOrLess}
          </button>
        </div>
      )}
    </div>
  )
}

export default MyAppointment;