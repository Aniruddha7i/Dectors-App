import express from 'express';
import { registorUser, LoginUser } from '../controller/userController.js';

const userRouter = express.Router();
userRouter.post('/register', registorUser);
userRouter.post('/login', LoginUser);

export default userRouter;