import User from '../models/user.js';
import {mongoose} from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const previoushash = '$2b$10$wBu7gZGpfQXI/7WkU8HZfO6uRzoFhnDOaJf4iBbbVl7/D7LbQO7mC'
const password = 'securePassword123';
const saltRounds = 10; // Number of rounds to hash

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});

async function bcheck() {
    const gotpass = await bcrypt.compare(password, previoushash);
console.log('value got',gotpass);
}
bcheck();


const getAllUsers = async(req,res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

const getUsers = async(req,res) => {
    try {
        const users = await User.find({},'Name Surname _id');
    res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

const loginUser = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }


        // Verify the password
        console.log('Request password:', Password);
        const hashedRequestPassword = await bcrypt.hash(Password, 10);
        console.log('Hashed request password:', hashedRequestPassword);
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate token and return success response
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful!',
            user: {
                name: user.Name,
                surname: user.Surname,
                email: user.Email,
            },
            token,
        });

    } catch (error) {
        res.status(500).json({ mssg: "Login Failed from authroutes", error: error.message });
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
    // res.json({mssg: 'POST a new user'});
}


const deleteUser = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Id is not of the required type / id not found"})
    }

    const user = await User.findOneAndDelete({_id: id})
    // if no such one exists then dont do it
    if(!user){
        return res.status(400).json({error: "No such User to delete"});
    }
    res.status(200).json(user);

}

export {
    loginUser,
    registerUser,
    getAllUsers,
    getUsers,
    deleteUser
}