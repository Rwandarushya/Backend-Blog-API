import myposts from '../model/posts.json';

let posts=myposts;

export const getAllPosts=(req, res)=>{
    res.send(posts);
};

export const createPost= (req,res)=>{
        const myPost=req.body;
        posts.push(myPost);
        res.send(posts);
    };

export const getPostById= (req, res)=>{
    const {id} = req.params;
    const post= posts.find((p)=>p.post_id===parseInt(id) );
   res.send(post);
};

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


