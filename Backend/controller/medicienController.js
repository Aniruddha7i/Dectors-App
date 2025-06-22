// import asyncHandler from 'express-async-handler';
import MedicineModel from './../models/medicineModel.js';

const medicineList = async (req,res)=>{
    try{
        const medicine = await MedicineModel.find({});
        res.json({success:true,medicine});

    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}

export {medicineList};