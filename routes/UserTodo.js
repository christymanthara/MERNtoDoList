// const express = require('express')
import express from 'express';
import { createToDo,
         deleteToDo,
         getToDo,
         getToDos,
         updateToDo
 } from '../controller/toDoController.js';

const router = express.Router()
//the component we export from here will have the / at the end. 
//get all todos
router.get('/',getToDos); 

//get a single todo
router.get('/:id',getToDo);



//post a new todo
// router.post('/', (req,res) => {
//     res.json({mssg: 'POST a new todo'
//     })
// })
router.post('/register', createToDo);

//update a todo
router.patch('/:id', updateToDo);

//delete a todo
router.delete('/:id', deleteToDo)

export default router; 
// this export is picked up at the homepage