import express from 'express';
const router = express.Router();

// Sample route for registration
router.post('/register', (req, res) => {
    const { name, surname, age, email, password, image } = req.body;
    
    // Here, you'd normally interact with your database to create a new user.
    // For simplicity, we will send a success response.

    res.status(201).json({
        message: 'User registered successfully!',
        user: {
            name,
            surname,
            age,
            email,
            image, // If handling image, consider storing path after saving
        },
    });
});

// Sample route for login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Normally, verify the user's credentials here

    res.status(200).json({
        message: 'User logged in successfully!',
        user: { email },
    });
});

// module.exports = router;
export default router;
