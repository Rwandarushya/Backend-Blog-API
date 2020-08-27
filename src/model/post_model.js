import mongoose from 'mongoose'

const postSchema=mongoose.Schema({
    post_title:String,
    post_body:String,
    author:String, 
    author_email:String,
    Date:String,
})

module.exports= mongoose.model('Post', postSchema);
