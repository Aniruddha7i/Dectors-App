import React, { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props)=>{
    const [atoken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const [doctors,setDoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const getAllDoctors = async()=>{

        try{
            const {data } = await axios.post(`${backendUrl}/api/admin/all-doctor`,{},{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctors);
                console.log(data.doctors);
            }else{
                toast.error(data.message);
            }

        }catch(error){
            toast.error(error.message);
        }
    }
    const value = {
        atoken,setAToken,
        backendUrl,doctors,
        getAllDoctors
    }
     return (
        <AdminContext.Provider value = {value}>
            {props.children}
        </AdminContext.Provider>
     )
}

export default AdminContextProvider;