import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoc from '../components/RelatedDoc';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { doctors, backendUrl, getDoctors, token } = useContext(AppContext);

  const Navigate = useNavigate();
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  // all 7 days
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // fetching doctors data
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo);
  }

  // available date logic
  const getAvailable = async () => {
    setDocSlots([])
    // get current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // get date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // set end time with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // set hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      // time slots array
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        })

        // increase current date by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }

  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book an appointment');
      return Navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1; // Months are zero-based in JavaScript
      let year = date.getFullYear();

      const slotDate = day + '_' + month + '_' + year;
      console.log(slotDate);
      // call api to book appointment
      const { data } = await axios.post(backendUrl+'/api/user/appointment-booking',{docId,slotDate,slotTime},{headers:{token}})
      if (data.success) {
        toast.success(data.message,'1');
        getDoctors();
        return Navigate('/my-appointments');
      } else {
        toast.error(data.message,'2');
      }
    } catch (error) {
      toast.error(error.message,'3');
      console.log(error.message,'4');
    }
  }
  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailable()
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots,'docSlots');
  }, [docSlots]);

  return docInfo && (
    <div className='md:w-[90%] md:m-auto max-md:mx-4 w-full'>
      {/* doctor details */}
      <div className='flex flex-col md:flex-row gap-3'>
        <div className='bg-primary w-full md:max-w-[19rem] rounded-lg flex justify-center'>
          <img className='bg-primary w-full md:max-w-[19rem] rounded-lg' src={docInfo.profileImage} alt="" />
        </div>
        {/* right side  */}
        <div className='border border-black px-7 py-5 rounded-xl'>
          {/* doctor info */}
          <p className='text-2xl sm:text-3xl font-medium'>
            {docInfo.name}
            <img className='w-4 h-4 inline-block ml-2' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex gap-3 items-center'>
            <p className='text-center'>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='rounded-full border border-black px-[0.52rem] py-[0.1rem] text-xs text-center mt-1.5'>{docInfo.experience}</button>
          </div>
          {/* About */}
          <div className='mt-3'>
            <p className='font-medium'>About <img className='w-3 h-3 inline-block ml-1 mb-[0.2rem]' src={assets.info_icon} alt="" /></p>
            <p >{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-700'>${docInfo.fees}</span> </p>
        </div>
      </div>

      {/* booking slots */}
      <div className='md:ml-[11rem] md:pl-4 mt-4 ml-3 font-medium text-gray-600'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${index == slotIndex ? 'bg-blue-500 text-white' : 'border border-gray-200'}`}>
              <p>{item[0] && days[item[0].dateTime.getDay()]}</p>
              <p>{item[0] && item[0].dateTime.getDate()}</p>
            </div>
          ))}
        </div>
        {/* time table of selected day */}
        <div className='flex items-center w-full gap-3 overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 cursor-pointer rounded-full ${item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-500 border border-gray-300'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>

      </div>
      {/* related Doctors  */}
      <RelatedDoc docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment