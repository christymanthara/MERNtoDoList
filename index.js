import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

// Middleware setup
app.use(cors()); // Allows cross-origin requests
app.use(bodyParser.json()); // Parses JSON data
app.use(express.json()); // Parses JSON data for POST requests

// Import routes
import authRoutes from './routes/authRoutes.js'; //user authentication routes
app.use('/api/auth', authRoutes);

import toDoRoute from './routes/UserTodo.js';
app.use('/api/todos',toDoRoute);


//middleware to work on the req

app.use(express.json())


app.use((req,res, next) =>{
    console.log(req.path, req.method)
    next()
})

//Sending the data to the frontend
app.get('/',(req,res) =>{
    res.send('Hello from backend server index.js')
})

app.post('/',(req,res) => {
    res.send('Hello from backend server index.js post request')
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


