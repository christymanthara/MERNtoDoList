import ToDo from '../models/toDo.js';
import {mongoose} from 'mongoose'

//get all toDos

const getToDos = async(req,res) => {
    const toDos = await ToDo.find({}).sort({createdAt: -1})
    res.status(200).json(toDos)
}

//get a single toDos

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
    const { task,description,deadline,createdAt,completed, completedOn } = req.body;

    //add todo to db
    try {
        const toDo = await ToDo.create({task, description, deadline, createdAt, completed, completedOn});
        res.status(201).json({
            message: 'New task Created',
            toDo: {
                task, 
                description, 
                deadline, 
                createdAt, 
                completed, 
                completedOn 
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