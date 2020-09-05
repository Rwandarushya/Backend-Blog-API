import Messages from '../model/message_model';
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
uuidv4();

export const getAllMessages=(req, res)=>{
    Messages.find()
        .exec()
        .then(msgs=>{
            res.status(200).json(msgs);
        })
        .catch(err=>{
            res.status(500).json(err);
        });
};

export const findMessageById=(req, res)=>{
    const {id} = req.params;
    if(id.length !== 24) return res.status(400).json({ message: 'id is badly formatted' });
    Messages.findById(id)
        .exec()
        .then(msg=>{
            if(msg){
            res.status(200).json(msg);
            }
            else{
                res.status(404).json({message:'Message not found'})
            }
            
        })
        .catch(err=>{
            res.status(500)
        });
};

export const createMessage=(req, res)=>{
   const message= new Messages({
       names:req.body.names,
        email:req.body.email,
        message:req.body.message
   });
   message.save().then(result=>{
       res.send({message: 'Mesages saved succesfully',result});
   })
   .catch(err=>{
       res.send(err)
   });
 
};

export const deleteMessage=(req, res)=>{
const {id}= req.params;
Messages.deleteOne({_id:id})
        .exec()
        .then(result=>{
            res.status(200).json({message:'Message deleted succesfully'})
        }).
        catch(err=>{
            res.status(500).json(err);
        });
};

export const messageFound=(req, res, next)=>{
    const {id} = req.params;
    Messages.findById(id)
        .exec()
        .then(pst=>{
            if(!pst) return  res.status(404).json({message:'Message not found'})
            next();           
        })
        .catch(err=>{
            return  res.status(404).json({message:'Error, Message not found check your id'})
        });
}

