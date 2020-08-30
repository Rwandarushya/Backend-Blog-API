import Users from '../model/user_model'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs' 


export const getAllUsers=(req, res)=>{
    Users.find()
        .exec()
        .then(usr=>{
            res.status(200).json(usr);
        })
        .catch(err=>{
            res.status(500).json(err)
        });
};

export const findUserById=(req, res)=>{
    const {id} = req.params;
    Users.findById(id)
        .exec()
        .then(usr=>{
            if(usr){
            res.status(200).json(usr);
            }
            else{
                res.status(404).json({message:'User not found'})
            }            
        })
        .catch(err=>{
            res.status(500).send({message:'Could not find that user'})
        });
};


export const updateUser=(req, res)=>{
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=obs.value;
    }
    Users.update({_id:id},{set: updateOps})
            .exec()
            .then(result=>{
                res.status(200).json({message:"User updated successfully!"})
            })
            .catch(err=>{
                res.status(500).json({err})
            });
};

export const deleteUser=(req, res)=>{
    const {id}= req.params;
    Users.remove({_id:id})
        .exec()
        .then(result=>{
            res.status(200).json({message:'User deleted succesfully'})
        }).
        catch(err=>{
            res.status(500).json(err);
        });
};

export const userFound = (req, res, next) => {
    const {
        id
    } = req.params;
    Users.findById(id)
        .exec()
        .then(pst => {
            if (!pst) return res.status(404).json({
                message: 'user not found'
            })
            next();
        })
        .catch(err => {
            return res.status(404).json({
                message: 'Error, user not found check your id'
            })
        });
}
