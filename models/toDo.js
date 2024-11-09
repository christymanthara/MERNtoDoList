import {mongoose} from 'mongoose'


const toDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    maxLength:20
  },
  description: {
    type: String,
    maxLength:100
  },
  deadline: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  completed:{
    type: Boolean,
    required: true,
    default:false
  },
  completedOn:{
    type: Date,
    default: null
  }
})


const ToDo = mongoose.model('ToDo', toDoSchema)
export default ToDo;