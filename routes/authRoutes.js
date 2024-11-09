import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Sample route for registration
router.post('/register', async(req, res) => {
    const { name, surname, age, email, password, image } = req.body;
    
    // Here, you'd normally interact with your database to create a new user.
    // For simplicity, we will send a success response.
    try {
        const user = await User.create({name, surname, age, email, password, image});
        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                name,
                surname,
                age,
                email,
                image, // feedback wit the response
            },
        });


    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
    res.json({mssg: 'POST a new user'});



    
});


router.post('/login', async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
});

// module.exports = router;
export default router;
