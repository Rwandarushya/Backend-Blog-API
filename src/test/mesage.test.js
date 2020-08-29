import chai, {expect, should, assert} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
app.use(bodyParser.json());

chai.use(chaiHttp);


// test get routes

describe('Get /messages',()=>{
  beforeEach(function(){
    mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  });

  afterEach(function(){
    mongoose.disconnect();
  });
    it('it should  retrieve all messages when logged in as admin',(done)=>{ 
      chai.request(app)
             .post('/auth/login')
             .send({email:"mugisha11@gmail.com", password:"123456"})
             .then(function (res) {
                chai.request(app)
                    .get('/messages')
                    .set("Authorization",res.body.token)
                    .end((err,res)=>{
                      assert.typeOf(res.body,'Array')
                        done()
                    })                                 
             })
             .catch(function (err) {
                throw err;
             });
    });

    it('it should  get message of given id',(done)=>{ 
      chai.request(app)
             .post('/auth/login')
             .send({email:"mugisha11@gmail.com", password:"123456"})
             .then(function (res) {
                chai.request(app)
                    .get('/messages/5f4a197b0372400f38ff8e79')
                    .set("Authorization",res.body.token)
                    .end((err,res)=>{
                      assert.equal(res.body.msg.names,'Hirwa Gael')
                        done()
                    })                                 
             })
             .catch(function (err) {
                throw err;
             });
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
    it('it should save message',(done)=>{ 
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
                   assert.equal(res.body.message,'Mesages saved succesfully')
                   done();
           })
    });
  })

  // Test delete message route

  describe('DELETE /messages',()=>{
    var token='';
    beforeEach(function(){
        mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    });

    afterEach(function(){
        mongoose.disconnect();
    })

    it('it should not delete message when you provide wrong id',(done)=>{
         chai.request(app)
             .post('/auth/login')
             .send({email:"mugisha11@gmail.com", password:"123456"})
             .then(function (res) {
                console.log(res.body)
                chai.request(app)
                    .delete('/messages/hghggygvhvhvhvhvhv')
                    .set("Authorization",res.body.token)
                    .end((err,res)=>{
                        assert.equal(res.body.message,'Error, Message not found check your id');
                        done()
                    })                                 
             })
             .catch(function (err) {
                throw err;
             });

    })
    
    /*
    it('it should delete a post of a given id id',(done)=>{
        chai.request(app)
            .post('/auth/login')
            .send({email:"mugisha11@gmail.com", password:"123456"})
            .then(function (res) {
               console.log(res.body)
               chai.request(app)
                   .delete('/posts/5f47dca4002a9132c8b85082')
                   .set("Authorization",res.body.token)
                   .end((err,res)=>{
                       console.log(res.body)
                       assert.equal(res.body.message,'Post deleted succesfully')
                       done()
                   })                                 
            })
            .catch(function (err) {
               throw err;
            });

   })
   */
})


