import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets.js'
import { AdminContext } from '../../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
const AddDoctors = () => {
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [degree, setEducation] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  // const [degree, setDegree] = useState('');
  const [about, setAbout] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [docImg, setDocImg] = useState(false);
  const {atoken, backendUrl} = useContext(AdminContext);
  const onSubmitHandler = async (event)=>{
    event.preventDefault(); // to prevent reload while submiting
    try{
      if(!docImg) return toast.error('Please upload doctor image');
      // creat a form data
      const formData = new FormData();
      formData.append('image',docImg);
      formData.append('name', name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('speciality',speciality);
      formData.append('experience',experience);
      formData.append('fees',Number(fees));
      formData.append('degree',degree);
      formData.append('address',JSON.stringify({line1:address1,line2:address2}));
      formData.append('about',about);
      
      // send the data to the backend
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { atoken }
    });    
      console.log(data);
      if(data.success){
        setName('');
        setEmail('');
        setPassword('');
        setSpeciality('General physician');
        setExperience('2 year');
        setFees('');
        setEducation('');
        setAddress1('');
        setAddress2('');
        setAbout('');
        setDocImg(false);
        scrollTo(0,0);
        return toast.success(data.message);
      }
      else return toast.error(data.message);

    }catch(error){
      console.log(error);
      return toast.error(error.message);
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-4 text-lg font-medium'>Add Doctors</p>

      <div className='bg-white rounded w-full p-8 max-h-[80vh] overflow-y-scroll'>

        <div className='flex items-center gap-4 mb-9 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='cursor-pointer w-16 rounded-full bg-gray-300' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => { setDocImg(e.target.files[0]) }} type="file" id="doc-img" hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex lg:flex-row flex-col items-start gap-10 w-full'>
          <div className='w-full lg:flex-1 flex flex-col'>

            <div className='flex-1 flex gap-1 flex-col my-4 w-full'>
              <label htmlFor="">Doctor Name:</label>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='name' required className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500' />
            </div>

            <div className='flex gap-1 flex-col my-4 w-full'>
              <label htmlFor="">Doctor Email:</label>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='email' required className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500' />
            </div>

            <div className='flex gap-1 flex-col my-4 w-full'>
              <label htmlFor="">Doctor Password:</label>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' required className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500' />
            </div>

            <div className='flex gap-1 flex-col my-4 w-full'>
              <p>Experience:</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500'>
                <option value="1 year">1 Year</option>
                <option value="2 year">2 Year</option>
                <option value="3 year">3 Year</option>
                <option value="4 year">4 Year</option>
                <option value="5 year">5 Year</option>
                <option value="6 year">6 Year</option>
                <option value="7 year">7 Year</option>
              </select>
            </div>

            <div className='flex gap-1 flex-col my-4 w-full'>
              <label htmlFor="">Fees:</label>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} type="number" placeholder='Fees' required className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500' />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col'>
            <div className='flex gap-1 flex-col my-4 w-full'>
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex gap-1 flex-col my-4 w-full'>
              <label htmlFor="">Degree:</label>
              <input onChange={(e)=>setEducation(e.target.value)} value={degree} type="text" placeholder='Education' required className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500' />
            </div>

            <div className='flex gap-1 flex-col my-4 w-full'>
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} type="text" placeholder='Address 1' className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500' />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2} type="text" placeholder='Address 2' className='border border-gray-300 rounded-md p-2 max-w-[450px] lg:min-w-[250px] w-full focus:outline-none focus:border-blue-500' />
            </div>
          </div>
        </div>

        <div>
          <p>About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} placeholder='Write about doctor' rows={5} required className='border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500'></textarea>
        </div>

        <button className='mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-400 w-full md:w-auto'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctors