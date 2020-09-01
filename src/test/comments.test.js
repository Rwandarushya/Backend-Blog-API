import chai, {
  expect,
  should,
  assert
} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
app.use(bodyParser.json());

chai.use(chaiHttp);

describe('Get /All comments', () => {
  it('it should  retrieve all comments if post exist', (done) => {
    chai.request(app)
      .get('/comments/5f4a3d61137fc52900ad8420')
      .end((err, res) => {
        assert.typeOf(res.body, 'Array')
        done()
      })
  });

  it('it should show error message when trying to get comments of wrong id ',(done)=>{
    chai.request(app)
    .get('/comments/wronndidddd')
    .end((err, res) => {
      assert.equal(err, null)
      assert.equal(res.body.message,'Error, Post not found check your id')
      done()
    })
  })

})

describe('POST /comments',()=>{
  const myComment={  
    "Names": 'Silas Karasira', 
    "email":'kalasi@yahoo.fr', 
    "comment":'woowooooooo this is very nice'
 }
  it('it should save a comment',(done)=>{
    chai.request(app)
             .post('/auth/login')
             .send({email:"mugisha11@gmail.com", password:"123456"})
             .then(function (res) {
                chai.request(app)
                    .post('/comments/5f4a72dd3471f7148f54ad13')
                    .set("Authorization",res.body.token)
                    .send(myComment)
                    .end((err,res)=>{
                      assert.equal(err, null)
                      assert.equal(res.body.message,'Comment saved succesfully')
                        done()
                    })                                 
             })
             .catch(function (err) {
                throw err;
             });
    });
})

it('it should delete a comment of a given id id', (done) => {
  chai.request(app)
      .post('/auth/login')
      .send({
          email: "mugisha11@gmail.com",
          password: "123456"
      })
      .then(function (res) {
          const token = res.body.token;
          chai.request(app)
              .get('/comments/5f4a72dd3471f7148f54ad13')
              .end(function (err, res) {
                  chai.request(app)
                      .delete('/comments/' + res.body[0]._id)
                      .set("Authorization", token)
                      .end((err, res) => {
                          assert.equal(err,null)
                          assert.equal(res.body.message,'comment removed succesfully')
                          done()
                      })
              })
      })
      .catch(function (err) {
          throw err;
      });
})

