import myposts from '../model/posts.json';
import  jwt  from 'jsonwebtoken';
import bodyParser from 'body-parser'

let posts=myposts;

export const getAllPosts=(req, res)=>{
    res.send(posts);
};


export const createPost= (req,res)=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const myPost={...req.body, date, comments:[]};
            posts.push(myPost);
            res.send(myPost);        
    };

export const getPostById= (req, res)=>{
    const {id} = req.params;
    const post= posts.find((p)=>p.post_id===parseInt(id) );
   res.send(post);
};

export const getComments=(req, res)=>{
    const {id}= req.params;
    const post=  posts.find((p)=>p.post_id===parseInt(id));
    res.send(post.comments);
}

export const addComment=(req, res)=>{
    const {id}=req.params;
    const post= posts.find((p)=>p.post_id===parseInt(id));
    const comment= req.body;
    post.comments.push(comment);
    res.send(post.comments);
}

export const deletePost=(req,res)=>{
    const {id} = req.params;
    posts=posts.filter((p)=>p.post_id !==parseInt(id) );
    res.send(posts);
};

export const updatePost=(req, res)=>{
    const {id} = req.params;
    const {post_title, post_body, author}= req.body;
    const myPost= posts.find(p=>p.post_id===parseInt(id) );

    if(post_title){
        myPost.post_title=post_title;
    }
    if(post_body){
        myPost.post_body=post_body;
    }
    if(author){
        myPost.author=author;
    }

    res.send(posts);
};


