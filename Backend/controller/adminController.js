import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorsModel.js';
import jwt from 'jsonwebtoken';
// API for adding doctor
const addDoctors = async (req, res) => {
    try {
        const {
            name, email, password, speciality, degree,
            experience, about, fees, address
        } = req.body;

        const imageFile = req.file;

        // Validate required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Email verification
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Password validation
        if (password.length < 5) {
            return res.status(400).json({ success: false, message: "Password should be at least 5 characters long" });
        }

        // Hash doctor's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        let imageUrl = null;
        if (imageFile) {
            const imageUploaded = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUploaded.secure_url;
        }

        // Create doctor data
        const doctorData = {
            name,
            email,
            profileImage: imageUrl, // Store image URL
            password: hashedPassword,
            speciality,
            degree,
            experience, // Convert experience to number
            about,
            fees, // Convert fees to number
            address: JSON.parse(address), // Ensure address is parsed
            date:Date.now()
        };

        // Store data in the database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// API for admin login
const LoginAdmin = async (req,res)=>{
    try{
        const {email, password} = req.body;
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            // generate web token
            const token = jwt.sign(email+password,process.env.SECRET_JWT);
            res.status(201).json({success:true,token})
        }else{
            res.status(404).json({success:false,message:"Invalid Credential"})
        }

    }catch(error){
        console.error("Error Login Admin:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export { addDoctors,LoginAdmin };