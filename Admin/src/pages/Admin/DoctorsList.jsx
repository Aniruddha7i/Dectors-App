import React, {useEffect,useContext} from 'react'
import { AdminContext } from '../../context/AdminContext';
const DoctorsList = () => {
  const {atoken, doctors, getAllDoctors} = useContext(AdminContext);
  useEffect(()=>{
   if(atoken){
    getAllDoctors();
   }
  },[atoken])
  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {
          doctors.map((item,index)=>(
            <div key={index}>
              <img src={item.profileImage} alt="" />
              <div>
                <p>{item.name}</p>
                <p>{item.speciality}</p>
                <div>
                  <input type="checkbox" checked={item.available}/>
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