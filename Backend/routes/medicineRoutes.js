import express from 'express';
import { medicineList } from '../controller/medicienController.js';

const medicineRouter = express.Router();

medicineRouter.get('/medicineList',medicineList);

export default medicineRouter;