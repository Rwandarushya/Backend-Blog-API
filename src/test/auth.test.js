import chai, {expect, should, assert} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import Users from '../model/user_model'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
app.use(bodyParser.json());

chai.use(chaiHttp);

describe('POST /login',()=>{

  it('it should give welcome message',(done)=>{
    chai.request(app)
        .get('/')
        .end((err, res)=>{
          assert.equal(err,null);
          assert.equal(res.body.message, 'welcome to express')
          done();
        })
  })

  it('user should login',(done)=>{ 
      chai.request(app)
             .post('/auth/login')
             .send({email:"mugisha11@gmail.com", password:"123456"})
             .end( (err, res)=>{
                 assert.equal(err, null);
                 assert.typeOf(res.body.token, "string")               
                 expect(res.body.message).to.equal('User Logged in succesfully')
                 done();
         })
  });

  //when try to login user who is not registered

  it("should not be able to login if they have not registered", function(done) {
    chai.request(app)
          .post("/auth/login")
          .send({ email: "wrongemail@gmail.com", password: "nope" })
          .end(function(err, res) {
            assert.equal(err, null)
            assert.equal(res.body.message,'User not registered, create Account');
      done();
    });
  });
})

//test signup new user route

describe('POST /signUp',()=>{
  it('it should not register user when email is already exist',(done)=>{ 
    //mock user
    const user={
      "first_name":"Rachel",
      "last_name":"Giramahoro",
      "email":"gigi1@gmail.com",
      "role":"admin",
      "password":"0000"
    }
      chai.request(app)
             .post('/auth/signup')
             .send(user)
             .end( (err, res)=>{
                 assert.equal(err, null);
                 expect(res.body.message).to.equal('This email is registered with an other account')
                 done();
         })
  });


  after(() => {
    Users.remove({email:'stevemug@gmail.com'})
        .exec()
        .then(result=>{
            res.status(200).json({message:'User deleted succesfully'})
        }).
        catch(err=>{
            res.status(500).json(err);
        });
  });  

  it('it should register user',(done)=>{ 
    //mock user
    const user={
      "first_name":"Rachel",
      "last_name":"Giramahoro",
      "email":"stevemug@gmail.com",
      "role":"admin",
      "password":"0000"
    }
      chai.request(app)
             .post('/auth/signup')
             .send(user)
             .end( (err, res)=>{
                 assert.equal(err, null);
                 expect(res.body.message).to.equal('User Registered succesfully')
                 done();
         })
  });
})




