import express from 'express';
import upload from '../middleware/multer.js';
import { addDoctors,LoginAdmin, allDoctors, addMedicine } from '../controller/adminController.js'
import authAdmin from '../middleware/authAdmin.js';
import { changeAvaliability } from '../controller/doctorContorller.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctors);
adminRouter.post('/login',LoginAdmin);
adminRouter.post('/all-doctor',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvaliability);
adminRouter.post('/add-medicine',authAdmin,upload.single('image'),addMedicine);

export default adminRouter;