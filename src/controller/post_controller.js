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
            res.send({message:"post created succesfully",myPost});        
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

export const deleteById=(req, res)=>{
    const {id,c_id}=req.params;
    const post= posts.find((p)=>p.post_id===parseInt(id));
    const comment= post.comments.find((c)=>c.comment_id===c_id);
    post.comments.pop(comment);
    res.send({message: "comments deleted succesfully", comments:post.comments});
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

export const verifyAuthor=(req,res,next)=>{
    const {id}= req.params
    const thisPost=posts.find(p=>p.post_id===parseInt(id));
    //get auth header values
    const bearerHeader= req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        req.token=bearerHeader;
        jwt.verify(req.token, 'secretkey', (err, tokenData)=>{
            if(err){
                res.send(err); 
            }
            else{
              if(tokenData.email!==thisPost.author_email) return res.status(403).send({ auth: false,message:"Unable to perfom this action, You are not the author of this post!"});
              if(user.role!=='admin') return res.status(401).send({ auth: false,message:"Unable to perfom this action, You are not admin!"});
              next();
            }
        });        
    }
    else{
        res.sendStatus(403);
    }
  }




