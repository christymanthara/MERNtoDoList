// const express = require('express')
import express from 'express';

const router = express.Router()
//the component we export from here will have the / at the end. 
//get all todos
router.get('/',(req,res) => {
    res.json({mssg:'GET all todos'})
}) 

//get a single todo
router.get('/:id',(req,res) => {
    res.json({mssg: 'GET a single todo'})
})


//post a new todo
router.post('/', (req,res) => {
    res.json({mssg: 'POST a new todo'
    })
})

//update a todo
router.patch('/:id', (req,res) => {
    res.json({mssg: 'Update a todo by the id'
    })
})

//delete a todo
router.delete('/:id', (req,res) => {
    res.json({mssg: 'Delete a todo by the id'
    })
})

export default router; 
// this export is picked up at the homepage