import  jwt  from 'jsonwebtoken';

export const verifyToken=(req, res, next)=>{
    //get auth header values
    const bearerHeader= req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer= bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        jwt.verify(req.token, 'secretkey', (err, authData)=>{
            if(err){
                res.sendStatus(403); 
            }
            else{
                next();
            }
        });        
    }
    else{
        res.sendStatus(403);
    }
}