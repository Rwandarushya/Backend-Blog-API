import chai, {expect, should, assert} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
app.use(bodyParser.json());

chai.use(chaiHttp);


describe('Get /messages',()=>{
    it('it retrieve all messages',(done)=>{ 
        chai.request(app)
               .get('/messages')
               .set("Authorization", "ttttt")
               .end( (err, res)=>{
                   assert.equal(err, null);
                   console.log(res.body);
                   done();
           })
    });
})

//test send message route

describe('POST /messages',()=>{
    beforeEach(function(){
      mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    });
  
    afterEach(function(){
      mongoose.disconnect();
    });
    it('it should save message',()=>{ 
        const myMessage={
            "names":"Hirwa Gael",
            "email":"gael@gmail.com",
            "message":"greetings bantu banjye"
            }
        chai.request(app)
               .post('/messages')
               .send(myMessage)
               .end( (err, res)=>{
                   assert.equal(err, null);
                   console.log(res.body.message);
                   done();
           })
    });
  })