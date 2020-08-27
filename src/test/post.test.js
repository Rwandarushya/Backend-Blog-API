import chai, {expect, should, assert} from 'chai';
const chaiHttp= require('chai-http');
import app from '../index.js';
import bodyParser from 'body-parser'
import {login} from './middleware.js'
app.use(bodyParser.json());

chai.use(chaiHttp);


describe('Test the authentication',()=>{
        it('it should check user and return token',()=>{
        chai.request(app)
            .post('/login')
            .end((err, res)=>{
                assert.equal(err, null);
                assert.typeOf(res.body, 'Object');
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

    it( 'it should return all comments on specific post', ()=>{
        chai.request(app)
            .get('/posts/1/comments')
            .end((err, res)=>{
                const comments= res.body;
                expect(comments).to.be.a('array');
                expect(comments).to.have.lengthOf(2);
            });
    });

    it('it should add comment to the post', ()=>{
        before((done)=>{
        login();
        //creating a mock comment
        const comment=  {
            "comment_id": "0007",
            "Names": "Paccy Lotro",
            "email": "ligana@gmail.com",
            "comment": "Always Welcome"
        };
        chai.request(app)
            .post('/posts/1/comments')
            .send(comment)
            .end((err, res)=>{
                const comments= res.body;
                expect(comments[2].Names).to.equal('Paccy Lotro');
            });
            done();
        });
    });

    it('it should save the post',()=>{        
         before((done)=>{
            const myPost={    
                "post_id": 5,
                     "post_title": "Web development processs",
                     "post_body": "information gathering, planning, design , implementing, testing and deployin, maintenamce",
                     "author": "Gael Hirwa"
             }
            login();             
        
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



