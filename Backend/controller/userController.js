import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from './../models/userModel';
const registorUser  = async (req,res)=>{
    const {name,email,password} = req.body;
    // check validation of all fields 
    if(!name || !email || !password){
        return res.status(400).json({message:"Please fill all the fields"});
    }
    else if(!validator.isEmail(email)){
        return res.status(400).json({message:"Emter a valid Email"});
    }
    else if(password.length<5) return res.status(400).json({message:"Password must be greater than 5 characters"});
   
    const salt = bcrypt.gensalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const userData = {
        name,
        email,
        password: hashPassword
    }
    const newUser = new userModel(userData);
    const user = await newUser.save();

}