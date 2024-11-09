import User from '../models/user.js';
import {mongoose} from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const getAllUsers = async(req,res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // 2. Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // 3. Generate a token (Optional, for user sessions)
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // 4. Send success response
        res.status(200).json({
            message: 'Login successful!',
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
            token, // Send token if using JWT
        });

    } catch (error) {
        res.status(500).json({ mssg:"Login Failed from authroutes" ,error: error.message });
    }
};

const registerUser = async(req,res) => {
    const { Name, Surname, Age, Email, Password, coverImageName } = req.body;
    
    // Here, you'd normally interact with your database to create a new user.
    // For simplicity, we will send a success response.
    try {
        const user = await User.create({Name, Surname, Age, Email, Password, coverImageName});
        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                Name,
                Surname,
                Age,
                Email,
                coverImageName, // feedback wit the response
            },
        });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    res.json({mssg: 'POST a new user'});
}

export {
    loginUser,
    registerUser,
    getAllUsers
}