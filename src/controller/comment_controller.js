import Comments from '../model/comment_model';
import Posts from '../model/post_model'
import  jwt  from 'jsonwebtoken';
import mongoose from 'mongoose';
import { v4 as uuidv4, stringify } from 'uuid';
uuidv4();

export const getAllComments=(req, res)=>{
    const {id} = req.params;
    Comments.find({post_id:id})
        .exec()
        .then(cmt=>{
            if(cmt){
            res.status(200).json(cmt);
            }            
        })
        .catch(err=>{
            res.status(500)
        });
}

export const addComment=(req, res)=>{
   const {id}=req.params;
   console.log(id)
   var today = new Date();
   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   const newComment= new Comments({
    Names: req.body.Names, 
    email:req.body.email, 
    comment:req.body.comment,
    date: date,
    post_id:id
   });
   newComment.save().then(result=>{
       res.send({message: 'Comment saved succesfully',result});
   })
   .catch(err=>{
       console.log(err)
   });
}

export const deleteById=(req, res)=>{
    const {id} = req.params;
    Comments.deleteOne({_id:id})
        .exec()
        .then(cmt=>{
            if(cmt){
            res.status(200).json({message:'comment removed succesfully'});
            }           
        })
        .catch(err=>{
            res.status(500).send(err)
        });
}

export const postFound = (req, res, next) => {
    const {
        id
    } = req.params;
    if(id.length !== 24) return res.status(400).json({ status: 400, message: 'Id wrong formatted' });
    Posts.findById(id)
        .exec()
        .then(pst => {
            if (!pst) return res.status(404).json({
                message: 'Post not found'
            })
            next();
        })
        .catch(err => {
            return res.status(404).json({
                message: 'Error, Post not found check your id'
            })
        });
}

export const commentFound = (req, res, next) => {
    const {
        id
    } = req.params;
    Comments.findById(id)
        .exec()
        .then(pst => {
            if (!pst) return res.status(404).json({
                message: 'Comment not found'
            })
            next();
        })
        .catch(err => {
            return res.status(404).json({
                message: 'Error, comment not found check your id'
            })
        });
}
