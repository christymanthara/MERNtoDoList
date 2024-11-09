import {mongoose} from 'mongoose'


const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Surname:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Email: {
        type: String,
        required: true,
        unique: true, // if you want emails to be unique
        lowercase: true, // converts the email to lowercase
        trim: true, // removes whitespace
        validate: {
            validator: function(value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value); // basic email regex
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    Password:{
        type: String,
        required:true,
        minlength: 6,
    },
    coverImageName: {
        type: String
      }
})

userSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageName != null) {
      return path.join('/', coverImageBasePath, this.coverImageName)
    }
  })

const User = mongoose.model('User', userSchema);
export default User;