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
  it('it should  retrieve all comments of a post', (done) => {
    chai.request(app)
        .get('/posts')
        .end(function (err, res) {
            chai.request(app)
                .get('/comments/' + res.body[0]._id)
                .end((err, res) => {
                    assert.equal(err,null)
                    assert.typeOf(res.body,'Array')
                    done()
                })
            })
    })
    

  it('it should show error message when trying to get comments of wrong id ',(done)=>{
    chai.request(app)
    .get('/comments/wronndidddd')
    .end((err, res) => {
      assert.equal(err, null)
      assert.equal(res.body.message,'Id wrong formatted')
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
    .send({
        email: "mugisha11@gmail.com",
        password: "123456"
    })
    .then(function (res) {
        const token = res.body.token;
        chai.request(app)
            .get('/posts')
            .end(function (err, res) {
                chai.request(app)
                    .post('/comments/' + res.body[0]._id)
                    .set("Authorization", token)
                    .end((err, res) => {
                        assert.equal(err,null)
                        assert.equal( res.body.message,'Comment saved succesfully')
                        done()
                    })
            })
    })
    .catch(function (err) {
        throw err;
    });
})
})


describe('DELETE /comments', ()=>{
  it('it should delete a comment',(done)=>{
    chai.request(app)
    .post('/auth/login')
    .send({
        email: "mugisha11@gmail.com",
        password: "123456"
    })
    .then(function (res) {
        const token = res.body.token;
        chai.request(app)
            .get('/posts')
            .end(function (err, res) {
                chai.request(app)
                    .get('/comments/' + res.body[0]._id)
                    .end((err, res) => {
                        chai.request(app)
                            .delete('/comments/'+res.body[res.body.length-1]._id)
                            .set("Authorization", token)
                            .end((err, res)=>{
                              assert.equal(err, null)
                              assert.equal(res.body.message,'comment removed succesfully')
                              done()
                            })                            
                    })
            })
    })
    .catch(function (err) {
        throw err;
    });
})
})


