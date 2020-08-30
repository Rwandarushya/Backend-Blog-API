import chai, {expect, should, assert, Assertion} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import bodyParser from 'body-parser'
import mongoose, { set } from 'mongoose'
app.use(bodyParser.json());

chai.use(chaiHttp);

describe('POST /post',()=>{
    var token='';
    beforeEach(function(){
        mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    });

    afterEach(function(){
        mongoose.disconnect();
    })

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
             .send({email:"chris@gmail.com", password:"123456"})
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
    beforeEach(function(){
        mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    });

    afterEach(function(){
        mongoose.disconnect();
    })

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
            .get('/posts/5f47dc26002a9132c8b85081')
            .end((err,res)=>{
                assert.equal(res.body.post_title,'Complete guide to web development with java')
                assert.equal(res.body.author,'MUginzi oscar')
                done()
                })
        })

        it('it should not  get post when provided wrong  id',(done)=>{
            chai.request(app)
                .get('/posts/wrongidddddd')
                .end((err,res)=>{
                    assert.equal(res.body.message,'Post not found')
                    done()
                    })
            })   
            
})


// test delete post route

describe('DELETE /post',()=>{
    var token='';
    beforeEach(function(){
        mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    });

    afterEach(function(){
        mongoose.disconnect();
    })

    it('it should not delete a postt when you provide wrong id',(done)=>{
         chai.request(app)
             .post('/auth/login')
             .send({email:"mugisha11@gmail.com", password:"123456"})
             .then(function (res) {
                chai.request(app)
                    .delete('/posts/hghggygvhvhvhvhvhv')
                    .set("Authorization",res.body.token)
                    .end((err,res)=>{
                        assert.equal(res.body.message,'Error, Post not found check your id')
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



