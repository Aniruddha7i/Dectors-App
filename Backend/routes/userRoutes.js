import express from 'express';
import { registorUser, LoginUser, getUserData, updateUserData, appointmentBooking } from '../controller/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();
userRouter.post('/register', registorUser);
userRouter.post('/login', LoginUser);
userRouter.get('/getUser',authUser,getUserData);
userRouter.post('/updateData',upload.single('image'),authUser,updateUserData);
userRouter.post('/appointment-booking',authUser,appointmentBooking);
export default userRouter;