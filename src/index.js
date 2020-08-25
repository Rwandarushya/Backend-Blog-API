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

// connect to the database


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





// app.delete('/posts/:id',verifyToken,(req,res)=>{
//     jwt.verify(req.token, 'secretkey', (err, authData)=>{
//         if(err){
//             res.sendStatus(403);
//         }else {
//             const {id} = req.params;
//             posts=posts.filter((p)=>p.post_id !==parseInt(id) );
//             res.send(posts); 
//         }
//     });
    
// });
app.use('/posts', postRoutes);
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);

export default app;