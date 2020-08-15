import express from 'express';
import bodyParser from 'body-parser';

import postRoutes from './routes/posts.js'

const app=express();

const PORT=process.env.PORT || 3001;

app.use(bodyParser.json());

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
});

app.get('/', (req, res)=>{
    res.send('welcome to express');
});

app.use('/posts', postRoutes);