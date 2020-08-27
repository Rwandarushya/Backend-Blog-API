import  jwt  from 'jsonwebtoken';
import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs' 
import allUsers from '../model/users.json';
let users= allUsers;

//login middleware

 export const login = (req, res) => {
    const { email, password } = {
        "email":"robert@gmail.com",
        "password":"123456"
        }
    const userFound = users.find(((userInfo) => userInfo.email === email));
    if (!userFound) return res.status(404).send({ status: 404, message: 'Account does not exist' });
  
    var passwordIsValid = bcrypt.compareSync(password, userFound.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false,message:"incorrect password", token: null });
  
    var token = jwt.sign({ email:userFound.email, password:userFound.password }, 'secretkey', {
      expiresIn: 86400 // expires in 24 hours
    });
    return token;
  };