import chai, {expect, should, assert} from 'chai';
const chaiHttp= require('chai-http');
import app from '../index.js';
import bodyParser from 'body-parser'
import {login} from './middleware.js'

app.use(bodyParser.json());

chai.use(chaiHttp);


describe('/messages',()=>{
    it('it should save the post',()=>{        
        before((done)=>{
           const myMsg={    
            "id":"0002",
            "names":"Hirwa Gael",
            "email":"gael@gmail.com",
            "message":"greetings"
            }
       
           chai.request(app)
               .post('/messages')
               .send(myMsg)
               .end( (err, res)=>{
                   assert.equal(err, null);
                   assert.typeOf(res,'string');
                   done();
           })
       });
});
});

describe('get request to /messages',()=>{
    it('it retrieve specific messages',()=>{ 
    before((done)=>{
        login();
        chai.request(app)
               .get('/messages')
               .end( (err, res)=>{
                   assert.equal(err, null);
                   assert.typeOf(res.body,"array");
                   done();
           })
    });
});
});

describe('request to /messages/0002',()=>{
    it('it retrieve specific messages',()=>{ 
    before((done)=>{
        login();
        chai.request(app)
               .get('/messages/0002')
               .end( (err, res)=>{
                   assert.equal(err, null);
                   assert.equal(res.body.names,"Hirwa Gael");
                   done();
           })
    });
});
});

