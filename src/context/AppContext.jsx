import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const AppContext = createContext();
import { toast } from "react-toastify";

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(null);

    const getDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/getUser`, { headers: { token } })
            if (data.success) {
                setUserData(data.userData);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getDoctors();
    }, [])

    useEffect(()=>{
        if(token) {
            getUserData();
        }
        else{
            setUserData(false);
        }
    },[token]);


    const value = {
        doctors,getDoctors,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;