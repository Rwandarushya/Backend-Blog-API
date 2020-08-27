import Comments from '../model/comment_model';
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
            else{
                res.status(404).json({message:'No comment found'})
            }            
        })
        .catch(err=>{
            console.log(err)
            res.status(500)
        });
}

export const addComment=(req, res)=>{
   const post_id=req.params;
   var today = new Date();
   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   const newComment= new Comments({
    Names: req.body.Names, 
    email:req.body.email, 
    comment:req.body.comment,
    date: date,
    post_id:'post_id'
   });
   newComment.save().then(result=>{
       res.send({message: 'Comment saved succesfully',result});
   })
   .catch(err=>{
       console.log(err)
   });
}

export const deleteById=(req, res)=>{
    const {id,c_id} = req.params;
    Comments.remove({post_id:id},{_id:c_id})
        .exec()
        .then(cmt=>{
            if(cmt){
            res.status(200).json({message:'comment removed succesfully'});
            }
            else{
                res.status(404).json({message:'No comment found'})
            }            
        })
        .catch(err=>{
            console.log(err)
            res.status(500)
        });
}
