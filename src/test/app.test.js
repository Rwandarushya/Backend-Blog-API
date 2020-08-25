import chai, {expect, should, assert} from 'chai';
const chaiHttp= require('chai-http');
import app from '../index.js';
import bodyParser from 'body-parser'

app.use(bodyParser.json())

chai.use(chaiHttp);


describe('Test the authentication',()=>{
    it('it should check user and return token',()=>{
        chai.request(app)
            .post('/login')
            .end((err, res)=>{
                assert.typeOf(res.body, 'Object');
                assert.typeOf(res.body.token, 'string');
                console.log(res.body);
            })
    })
    
});

describe('Test posts route',()=>{
    it('it should get all the posts',()=>{
        chai.request(app)
            .get('/posts')
            .end((err, res)=>{
                assert.equal(err, null);
                assert.typeOf(res, 'Object');
            })
    });

    it('it should return single post',()=>{
        chai.request(app)
            .get('/posts/2')
            .end((err, res)=>{
                assert.equal(err, null);
                assert.equal(res.body.post_title, 'Cyber security');
                assert.equal(res.body.author, 'Ngoga David');
            })
    })

    it('it should save the post',()=>{        
         before((done)=>{
            const myPost={    
                "post_id": 5,
                     "post_title": "Web development processs",
                     "post_body": "information gathering, planning, design , implementing, testing and deployin, maintenamce",
                     "author": "Gael Hirwa"
             }
            chai.request(app)
                .post('/login')
                .end((err, res)=>{
                    // if i want to test login
                });                
        
            chai.request(app)
                .post('/posts')
                .send(myPost)
                .end( (err, res)=>{
                    assert.equal(err, null);
                    assert.equal(res.body.post_title,'Web development processs');
                    done();
            })
        });
    })
});

describe('Test users',()=>{
    it('it should return all users',()=>{
        chai.request(app)
            .get('/users')
            .end((err, res)=>{
                // err.should.equal(null);
                assert.equal(err, null);
                assert.typeOf(res.body, 'Array');
                assert.lengthOf(res.body, 2);
            })
    });

    it('it should return single user', ()=>{
        chai.request(app)
            .get('/users/2')

    });

    it('it should save new user',()=>{ 
        beforeEach(function (done) {       
            user = new User({
                "user_id": "0008",
                "First-name": "Muhire Olivier",
                "Last-name": "John",
                "email": "joohn@gmail.com",
                "role": "admin"               
            });
            request(app)
                .post('/users')
                .send(user)
                .end((err, res)=> {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.user_id.should.exist;
                    done();
            });
    });   
});

});


