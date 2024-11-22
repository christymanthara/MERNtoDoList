import ToDo from '../models/toDo.js';
import User from '../models/user.js'
import {mongoose} from 'mongoose'

//get all toDos

const getToDos = async(req,res) => {
    try {
        const toDos = await ToDo.find({}).sort({createdAt: -1});
        res.status(200).json(toDos);        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

//get a single toDos //not necessary

const getToDo = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Id is not of the required type / id not found"})
    }

    const toDo = await ToDo.findById(id)

    if(!toDo){
        return res.status(404).json({error: "No such task"});
    }
    res.status(200).json(toDo);

}


//create a toDo
const createToDo = async(req, res) => {
    const { task,description,deadline,createdAt,completed, completedOn, userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    //add todo to db
    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const toDo = await ToDo.create({task, description, deadline, createdAt, completed, completedOn, userId});
        res.status(201).json({
            message: `New task Created for ${user.Name}`,
            toDo: {
                task, 
                description, 
                deadline, 
                createdAt, 
                completed, 
                completedOn,
                userId 
            },
        });
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}


//Delete a toDo
const deleteToDo = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Id is not of the required type / id not found"})
    }

    const toDo = await ToDo.findOneAndDelete({_id: id})
    // if no such one exists then dont do it
    if(!toDo){
        return res.status(400).json({error: "No such task to delete"});
    }
    res.status(200).json(toDo);

}

//update todo
const updateToDo = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Id is not of the required type / id not found"})
    }

    const toDo = await ToDo.findOneAndUpdate({_id: id},{
        ...req.body //... for spreading the properties of the request body
    })
    // if no such one exists then dont do it
    if(!toDo){
        return res.status(400).json({error: "No such task to delete"});
    }
    res.status(200).json(toDo);
}


export {
    createToDo,
    getToDo,
    getToDos,
    deleteToDo,
    updateToDo
}