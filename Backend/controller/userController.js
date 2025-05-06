import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from './../models/userModel.js';
import jwt  from 'jsonwebtoken';
import { Suspense } from 'react';
const registorUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check validation of all fields 
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        else if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Emter a valid Email" });
        }
        else if (password.length < 5) return res.status(400).json({ message: "Password must be greater than 5 characters" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);        

        const userData = {
            name,
            email,
            password: hashPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token  = jwt.sign({id:user._id},process.env.SECRET_JWT);
        res.status(201).json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }

};

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT);
        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// api for getting user data

export { registorUser,LoginUser };