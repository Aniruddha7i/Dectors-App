import React, { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [atoken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const [doctors, setDoctors] = useState([]);
    const [medicines, setMedicine] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Doctors
    const getAllDoctors = async () => {

        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-doctor`, {}, { headers: { atoken } })
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { atoken } });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // medicine
    const getMedicines = async () => {

        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-medicine`, {}, { headers: { atoken } })
            if (data.success) {
                setMedicine(data.medicine);
                console.log(data.medicine);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        atoken, setAToken,
        backendUrl, doctors,
        getAllDoctors,
        changeAvailability,
        getMedicines,
        medicines,
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;