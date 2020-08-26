import  jwt  from 'jsonwebtoken';
import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs' 
import allUsers from '../model/users.json';

let users= allUsers;

export const signup=(req, res)=>{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
    const user={
      "user_id": req.body.user_id,
      "first_name" : req.body.first_name,
      "last_name":req.body.last_name,
      "email" : req.body.email,
      "password" : hashedPassword,
      "role":req.body.role
    }
    users.push(user);
      // create a token
      var token = jwt.sign({ email:user.email, password:user.password }, 'secretkeyyy', {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, users });
}

export const login = (req, res) => {
  const { email, password } = req.body;

  const userFound = users.find(((userInfo) => userInfo.email === email));
  if (!userFound) return res.status(404).send({ status: 404, message: 'Account does not exist' });

  var passwordIsValid = bcrypt.compareSync(req.body.password, userFound.password);
  if (!passwordIsValid) return res.status(401).send({ auth: false,message:"incorrect password", token: null });

  var token = jwt.sign({ email:userFound.email, password:userFound.password }, 'secretkey', {
    expiresIn: 86400 // expires in 24 hours
  });
  res.json({message: 'Login succesfully',token});
};







export const verifyToken=(req, res, next)=>{
    //get auth header values
    const bearerHeader= req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        req.token=bearerHeader;
        jwt.verify(req.token, 'secretkey', (err, authData)=>{
            if(err){
                res.send(err); 
            }
            else{
                next();
            }
        });        
    }
    else{
        res.status(403).send({message: "unauthorized access, please login" });
    }
}

export const verifyAdmin=(req,res,next)=>{
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
            const user=users.find(((userInfo) => userInfo.email === tokenData.email));
            if(user.role!=='admin') return res.status(401).send({ auth: false,message:"Unable to perfom this action, You are not admin!"});
            next();
          }
      });        
  }
  else{
      res.sendStatus(403);
  }
}