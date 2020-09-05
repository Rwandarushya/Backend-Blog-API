import chai, {
  expect,
  should,
  assert
} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import Users from '../model/user_model'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
app.use(bodyParser.json());

chai.use(chaiHttp);

describe('POST /auth', () => {

  it('it should give welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.body.message, 'welcome to express')
        done();
      })
  })

  //when try to login user who is not registered

  it("should not be able to login if they have not registered", function (done) {
    chai.request(app)
      .post("/auth/login")
      .send({
        email: "wrongemail@gmail.com",
        password: "nope"
      })
      .end(function (err, res) {
        assert.equal(err, null)
        assert.equal(res.body.message, 'User not registered, create Account');
        done();
      });
  });
})

//test signup new user route

describe('POST /signUp', () => {

  before(() => {
    const newUser = new Users({
      first_name: "TestfirstName",
      last_name: "Test lastname",
      email: "guest@test.com",
      role: "guest",
      password: "123456"
    });
    newUser.save().then(res => {}).catch(err => {
      console.log(err)
    });
    
  })

  after(()=>{
    Users.deleteOne({ email: 'guest@test.com'})
          .exec()
          .then(res => {})
          . catch(err => {  console.log(err); });
  })

  it('it should not register user when email is already exist', (done) => {
    //mock user
    const user = {
      "first_name": "Rachel",
      "last_name": "Giramahoro",
      "email": "guest@test.com",
      "role": "guest",
      "password": "123456"
    }
    chai.request(app)
      .post('/auth/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(err, null);
        expect(res.body.message).to.equal('This email is registered with an other account')
        done();
      })
  });



  after(()=>{
    Users.deleteOne({ email: 'mugenzi@gmail.com'})
          .exec()
          .then(res => {})
          . catch(err => {  console.log(err); });
  })
  it('it should register user', (done) => {
    //mock user
    const user = {
      "first_name": "Mugenzi",
      "last_name": "Oscar",
      "email": "mugenzi@gmail.com",
      "role": "guest",
      "password": "123456"
    }
    chai.request(app)
      .post('/auth/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(err, null);
        expect(res.body.message).to.equal('User Registered succesfully')
        done();
      })
  });


  it('user should login', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({
        email: "mugisha11@gmail.com",
        password: "123456"
      })
      .end((err, res) => {
        assert.equal(err, null);
        assert.typeOf(res.body.token, "string")
        expect(res.body.message).to.equal('User Logged in succesfully')
        done();
      })
  });
})