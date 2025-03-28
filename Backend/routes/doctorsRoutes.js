import express from 'express';
import { doctorList } from '../controller/doctorContorller.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList);

export default doctorRouter;