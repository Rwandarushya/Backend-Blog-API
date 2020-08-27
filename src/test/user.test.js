import chai, {expect , should, assert} from 'chai'
import chaiHTTP from 'chai-http'
import app from '../index'
import bodyParser from 'body-parser'
import {login} from './post.test';

app.use(bodyParser.json());
chai.use(chaiHTTP);

describe('Test users',()=>{    
    before((done)=>{
        login();
    it('it should return all users',()=>{
        chai.request(app)
            .get('/users')
            .end((err, res)=>{
                // err.should.equal(null);
                assert.equal(err, null);
                assert.typeOf(res.body, 'Array');
                assert.lengthOf(res.body, 2);
            })
            done(); 
        });
    });

});
