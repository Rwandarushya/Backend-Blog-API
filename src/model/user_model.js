
import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String, 
    role:String,
    password:String,
})

module.exports= mongoose.model('Users', userSchema);
