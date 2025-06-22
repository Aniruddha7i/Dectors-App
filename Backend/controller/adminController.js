import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorsModel.js';
import MedicineModel from '../models/medicineModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// API for adding doctor
const addDoctors = async (req, res) => {
    try {
        const {
            name, email, password, speciality, degree,
            experience, about, fees, address
        } = req.body;

        const imageFile = req.file;
        // console.log(imageFile);

        // Check if all fields are provided
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
        dotenv.config(); // Load environment variables

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        let imageUrl = null;
        if (imageFile) {
            const imageUploaded = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUploaded.secure_url;
            // console.log(imageFile.path);
            // console.log("🔹 Cloudinary Config:", cloudinary.config());

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
            date: Date.now()
        };

        // Store data in the database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: "Server Error" });
    }
};

// API for adding medicine
const addMedicine = async (req, res) => {
    try {
        const { name, brand, category, price, stock, description } = req.body;
        const imageFile = req.file;

        // Check if all fields are provided
        if (!name || !brand || !category || !price || !stock || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate numeric fields
        if (isNaN(price) || isNaN(stock)) {
            return res.status(400).json({ success: false, message: "Price and stock must be numbers" });
        }

        // Load environment variables
        dotenv.config();

        // Configure Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        let imageUrl = null;
        if (imageFile) {
            const imageUploaded = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUploaded.secure_url;
            // console.log(imageFile.path);
            // console.log("🔹 Cloudinary Config:", cloudinary.config());

        }

        // Create medicine object
        const medicineData = {
            name: name.trim(),
            brand: brand.trim(),
            category,
            price: Number(price),
            stock: Number(stock),
            description: description.trim(),
            image: imageUrl,
            date: Date.now(),
        };

        // Save to database
        const newMedicine = new MedicineModel(medicineData);
        await newMedicine.save();

        return res.status(201).json({ success: true, message: "Medicine added successfully" });

    } catch (error) {
        console.error("Error adding medicine:", error);
        return res.json({ success: false, message: "Server Error" });
    }
};

// API for admin login
const LoginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            // generate web token
            const token = jwt.sign(email + password, process.env.SECRET_JWT);
            res.status(201).json({ success: true, token })
        } else {
            res.status(404).json({ success: false, message: "Invalid Credential" })
        }

    } catch (error) {
        console.error("Error Login Admin:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// API for getting all doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password"); // exclude password
        res.status(200).json({ success: true, doctors });

    } catch (error) {
        console.error("Error Login Admin:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// API for getting all medicines
const allMedicine = async (req, res) => {
    try {
        const medicine = await MedicineModel.find({});
        res.status(200).json({ success: true, medicine });

    } catch (error) {
        console.error("Error Login Admin:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export { addDoctors, LoginAdmin, allDoctors, addMedicine,allMedicine};