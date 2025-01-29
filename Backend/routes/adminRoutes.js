import express from 'express';
import upload from '../middleware/multer.js';
import { addDoctors,LoginAdmin } from '../controller/adminController.js'
import authAdmin from '../middleware/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctors);
adminRouter.post('/login',LoginAdmin);

export default adminRouter;