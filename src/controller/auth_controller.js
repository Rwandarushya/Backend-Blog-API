import  jwt  from 'jsonwebtoken';
import express from 'express'
import bcrypt from 'bcryptjs' 
import Users from '../model/user_model';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

export const signup=(req, res)=>{
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const newUser= new Users({
    first_name:req.body.lirst_name,
    last_name:req.body.last_name,
    email:req.body.email, 
    role:req.body.role,
    password:hashedPassword
    });
    newUser.save().then(result=>{
        var token = jwt.sign({ email:newUser.email, password:newUser.password }, 'secretkey', { expiresIn: 86400 });
        res.status(200).send({ message:"User Registered succesfully", token: token});
     })
    .catch(err=>{
        console.log(err)
    });
}

export const login = (req, res) => {
  const email= req.body.email;
  const password= req.body.password;

  Users.findOne({email:email})
        .exec()
        .then(usr=>{
          if(usr){
            bcrypt.compare(password, usr.password,function(err, result){
              if(err){
                res.json({err})
              }
              if(result){
                var token = jwt.sign({ email:usr.email, password:usr.password }, 'secretkey', { expiresIn: 86400 });
                res.status(200).send({ message:"User Logged in succesfully", token: token});
              }
              else{
                res.status(500).send({message:'Invalid password'})
              }
            })
          }
          else{
            res.send({message:'User not registered, create Account'})
          }
        })
        .catch(err=>{
          res.status(500).send({err});
        });
};







export const verifyToken=(req, res, next)=>{
    //get auth header values
    const bearerHeader= req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        req.token=bearerHeader;
        jwt.verify(req.token, 'secretkey', (err, authData)=>{
            if(err){
                res.send({message:"Un authorized access, your token is not valid!!!"}); 
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

export const checkDuplicate=(req, res, next)=>{
  Users.findOne({email:req.body.email})
        .exec()
        .then(usr=>{
            if(usr){
            res.send({message:'This email is registered with an other account'})
            }
            else{
              next();
            }            
        })
        .catch(err=>{
            console.log(err)
            res.status(500)
        });
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
            Users.find({email:tokenData.email})
            .exec()
            .then(usr=>{
              if(usr.role!=='admin') return res.status(401).send({ auth: false,message:"Unable to perfom this action, You are not admin!"});
              next();
            }).catch(
              err=>{console.log(err)}
            );    
          }
      });        
  }
  else{
      res.sendStatus(403);
  }
}