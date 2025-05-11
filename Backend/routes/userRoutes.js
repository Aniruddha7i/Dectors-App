import express from 'express';
import { registorUser, LoginUser, getUserData, updateUserData } from '../controller/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();
userRouter.post('/register', registorUser);
userRouter.post('/login', LoginUser);
userRouter.get('/getUser',authUser,getUserData);
userRouter.post('/updateData',upload.single('image'),authUser,updateUserData);
export default userRouter;