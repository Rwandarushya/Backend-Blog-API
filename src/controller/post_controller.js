import Posts from '../model/post_model';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {
    v4 as uuidv4
} from 'uuid';
uuidv4();

export const getAllPosts = (req, res) => {
    Posts.find()
        .exec()
        .then(psts => {
            res.status(200).json(psts);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


export const createPost = (req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newPost = new Posts({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        author: req.body.author,
        author_email: req.body.author_email,
        Date: date,
        comments: []
    });
    newPost.save().then(result => {
            res.send({
                message: 'post saved succesfully',
                result
            });
        })
        .catch(err => {
            console.log(err)
        });
}

export const getPostById = (req, res) => {
    const {
        id
    } = req.params;
    Posts.findById(id)
        .exec()
        .then(pst => {
            if (pst) {
                res.status(200).json(pst);
            } else {
                res.status(404).json({
                    message: 'Post not found'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
        });
};


export const postFound = (req, res, next) => {
    const {
        id
    } = req.params;
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



export const deletePost = (req, res) => {
    const {
        id
    } = req.params;
    Posts.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Post deleted succesfully'
            })
        }).
    catch(err => {
        res.status(500).json(err);
    });
};

export const updatePost = (req, res) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = obs.value;
    }
    Product.update({
            _id: id
        }, {
            set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Post updated successfully!"
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        });
};