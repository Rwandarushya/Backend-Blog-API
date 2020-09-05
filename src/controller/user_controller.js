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
            if(usr) res.status(200).json(usr);          
        })
        .catch(err=>{
            res.status(500).send({message:'Could not find that user'})
        });
};

export const updateUser=(req, res)=>{
    const {id} = req.params;
    Users.update({
            _id: id
        }, {
            set: {
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email, 
                role:req.body.role
            }
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User updated successfully!"
            })
        })
        .catch(err => {
            res.status(500).json({ err })
        });
};

export const deleteUser=(req, res)=>{
    const {id}= req.params;
    Users.deleteOne({_id:id})
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
