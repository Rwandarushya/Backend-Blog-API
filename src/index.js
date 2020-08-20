import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import myposts from './model/posts.json';
let posts=myposts;

import postRoutes from './routes/posts.js'
import messageRoutes from './routes/messages.js'
import userRoutes from './routes/user.js'

import jwt from 'jsonwebtoken';

const app=express();

const PORT=process.env.PORT || 3002;

app.use(bodyParser.json());

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
});

app.get('/', (req, res)=>{
    res.send('welcome to express');
});



app.post('/login', (req, res)=>{
    const user={
        user_id: "0001",
        username:" marius robert",
        email: "robert@gmail.com"
    }
    jwt.sign({user}, 'secretkey', function(err, token) {
        res.json({token});
      });
});

function verifyToken(req, res, next){
    //get auth header values
    const bearerHeader= req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer= bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.post('/posts',verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else {
            const myPost=req.body;
            posts.push(myPost);
            res.send(posts);  
        }
    });
});
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);