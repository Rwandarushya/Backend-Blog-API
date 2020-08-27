import mymessages from '../model/messages.json';
import bodyParser from 'body-parser'
let messages=mymessages;

export const getAllMessages=(req, res)=>{
    res.send(messages);
};

export const findMessageById=(req, res)=>{
    const {id} = req.params;
    const message= messages.find((msg)=>msg.id===(id) );
   res.send(message);
};

export const createMessage=(req, res)=>{
   const myMessage=req.body;
  messages.push(myMessage);
  res.send(messages);
};

export const deleteMessage=(req, res)=>{
const {id}= req.params;
messages=messages.filter((msg)=>msg.id !==id );
    res.send(messages);
};