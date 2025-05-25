import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from './../models/userModel.js';
import jwt from 'jsonwebtoken';
import { Suspense } from 'react';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import doctorModel from '../models/doctorsModel.js';
import appointmentModel from '../models/appointmentModel.js';
const registorUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check validation of all fields 
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        else if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Emter a valid Email" });
        }
        else if (password.length < 5) return res.status(400).json({ message: "Password must be greater than 5 characters" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT);
        res.status(201).json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }

};

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT);
        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// api for getting user data

const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        // we need a user authintication middleware to get the user id from the token
        const userData = await userModel.findById(userId).select("-password");
        res.status(200).json({ success: true, userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api for update user data
const updateUserData = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const Image = req.file;
        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({ success: false, message: "Data missing" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
        dotenv.config(); // Load environment variables

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        if (Image) {
            const imageUpload = await cloudinary.uploader.upload(Image.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });

        }
        res.status(200).json({ success: true, message: "User data updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// api for appointment booking
const appointmentBooking = async (req,res)=>{
    try{
        const { docId, userId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');

        if(!docData.available){
            return res.status(400).json({ success: false, message: "Doctor is not available" });
        }
        let slot_booked = docData.slot_booked;
        // checking for slot booking avalability
        if(slot_booked[slotDate]){
            if(slot_booked[slotDate].includes(slotTime)){
                return res.status(400).json({ success: false, message: "Slot already booked" });
            }
            else{
                slot_booked[slotDate].push(slotTime);
            }
        }else{
            slot_booked[slotDate] = [];
            slot_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slot_booked;
        const appointmentDate = {
            docId,
            userId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now(),
        }

        const newAppointment = new appointmentModel(appointmentDate);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slot_booked });
        res.status(200).json({ success: true, message: "Appointment booked successfully" });

    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export { registorUser, LoginUser, getUserData, updateUserData, appointmentBooking };