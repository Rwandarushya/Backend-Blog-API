import chai, {expect, should, assert, Assertion} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import bodyParser from 'body-parser'
import mongoose, { set } from 'mongoose'
import Users from '../model/user_model'
app.use(bodyParser.json());

chai.use(chaiHttp);

describe('POST /post',()=>{
    it('it should create new post',(done)=>{
        //mock test
        const myPost={    
            "post_title": "Web development processs",
            "post_body": "information gathering, planning, design , implementing, testing and deployin, maintenamce",
            "author": "Gael Hirwa",
            "author_email":"manzi@yahoo.fr"
         }
         chai.request(app)
             .post('/auth/login')
             .send({email:"mugisha11@gmail.com", password:"123456"})
             .then(function (res) {
                chai.request(app)
                    .post('/posts')
                    .set("Authorization",res.body.token)
                    .send(myPost)
                    .end((err,res)=>{
                        assert.equal(err, null);
                        assert.equal(res.body.message, "post saved succesfully")
                        expect(res.body.result.post_title).to.equal('Web development processs')
                        done()
                    })                                 
             })
             .catch(function (err) {
                throw err;
             });

    }) 

    it('it should not create a post when you are not logged in',(done)=>{
        //mock post
        const myPost={    
            "post_title": "Web development processs",
            "post_body": "information gathering, planning, design , implementing, testing and deployin, maintenamce",
            "author": "Gael Hirwa",
            "author_email":"manzi@yahoo.fr"
         }
            chai.request(app)
                .post('/posts')
                .send(myPost)
                .end((err,res)=>{
                    assert.equal(err, null);
                    assert.equal(res.body.message, "unauthorized access, please login")
                    done()
                })                                 

    })


    it('it should not create a post when you are not Admin',(done)=>{
        //mock post
        const myPost={    
            "post_title": "Web development processs",
            "post_body": "information gathering, planning, design , implementing, testing and deployin, maintenamce",
            "author": "Gael Hirwa",
            "author_email":"manzi@yahoo.fr"
         }
         chai.request(app)
             .post('/auth/login')
             .send({email:"jane@gmail.com", password:"123456"})
             .then(function (res) {
                chai.request(app)
                    .post('/posts')
                    .set("Authorization",res.body.token)
                    .send(myPost)
                    .end((err,res)=>{
                        assert.equal(err, null);
                        assert.equal(res.body.message, "Unable to perfom this action, You are not admin!")
                        done()
                    })                                 
             })
             .catch(function (err) {
                throw err;
             });

    })
})


//---------------------------------------Get all post-------------------------------------------------

describe('Get /post',()=>{
    it('it should retrieve all posts',(done)=>{
        chai.request(app)
            .get('/posts')
            .end((err,res)=>{
                expect(res.body).to.be.a('Array')
                done()
                })                                 
            })

    it('it should get post by id',(done)=>{
        chai.request(app)
        .get('/posts')
        .end(function (err, res) {
            chai.request(app)
                .get('/posts/' + res.body[0]._id)
                .end((err, res) => {
                    assert.equal(err,null)
                    expect(res.body).to.have.property('post_body')
                    done()
                })
        })
     })

        it('it should not  get post when provided wrong  id',(done)=>{
            chai.request(app)
                .get('/posts/wrongidddddd')
                .end((err,res)=>{
                    assert.equal(res.body.message,'id is badly formatted')
                    expect(res.status).to.equal(400)
                    done()
                    })
            })  
            
        it('it should return post not found', (done)=>{
            chai.request(app)
                .get('/posts/gdbjakdonaugeo38bs4920j1')
                .end((err, res)=>{
                    assert.equal(res.body.message,'Post not found check your id')
                    expect(res.status).to.equal(404)
                    done();
                })
        })
            
})


describe('PATCH /posts', ()=>{
    const postData={
        "post_title": "the history of java script",
        "post_body": " java created by james goslin in 1995 in sun microsystemffff",
        "author": "Jabo Jordan",
        "author_email":"newemail@yahoo.fr"
    }
    it('it should update the post', (done)=>{
        chai.request(app)
            .post('/auth/login')
            .send({email:'mugisha11@gmail.com', password:'123456'})
            .then(function(res){
                const token= res.body.token;
                chai.request(app)
                    .get('/posts')
                    .end(function (err, res) {
                        chai.request(app)
                            .patch('/posts/' + res.body[res.body.length-1]._id)
                            .set('Authorization', token)
                            .send(postData)
                            .end((err, res) => {
                                assert.equal(err,null)
                                assert.equal(res.body.message,'Post updated successfully!')
                                done()
                })
             })
          })

    })
})


// test delete post route

describe('DELETE /post',()=>{ 
    it('it should delete a post of a given id id', (done) => {
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
                            .delete('/posts/' + res.body[res.body.length-1]._id)
                            .set("Authorization", token)
                            .end((err, res) => {
                                assert.equal(err, null)
                                assert.equal(res.body.message, 'Post deleted succesfully')
                                done()
                            })
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })

})



