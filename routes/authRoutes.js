import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();
import { loginUser, registerUser, getAllUsers  } from '../controller/authController.js';

// route for registration
router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/', getAllUsers);

// module.exports = router;
export default router;
