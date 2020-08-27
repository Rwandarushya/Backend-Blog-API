import mongoose from 'mongoose'

const commentSchema=mongoose.Schema({
    Names: String, 
    email:String, 
    comment:String,
    date: String,
    post_id: String
})

module.exports= mongoose.model('Comments', commentSchema);