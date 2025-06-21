import express from 'express';
import { registorUser, LoginUser, getUserData, updateUserData, appointmentBooking, listAppointments, cancelAppointment, payRazorpay } from '../controller/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();
userRouter.post('/register', registorUser);
userRouter.post('/login', LoginUser);
userRouter.get('/getUser',authUser,getUserData);
userRouter.post('/updateData',upload.single('image'),authUser,updateUserData);
userRouter.post('/appointment-booking',authUser,appointmentBooking);
userRouter.get('/appointments',authUser,listAppointments);
userRouter.post('/cancel-appointment',authUser, cancelAppointment);
userRouter.post('/payment-razorpay',authUser, payRazorpay);
export default userRouter;