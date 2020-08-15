import express from 'express';

import post from './model/post'
const app=express();

const PORT=process.env.PORT || 3001;

app.get('/', (req, res)=>{
    res.json({post});
});

app.listen(PORT, ()=>{
        console.log(`App is running on port ${PORT}`);
});