import chai, {expect , should, assert} from 'chai'
import chaiHTTP from 'chai-http'
import app from '../index'
import bodyParser from 'body-parser'
import {login} from './middleware.js'

app.use(bodyParser.json());
chai.use(chaiHTTP);

describe('Test users',()=>{
    before((done)=>{
        const token=login();       
    it('it should return all users',()=>{
        chai.request(app)
            .get('/users')
            .set("Authorization", token)
            .end((err, res)=>{
                // err.should.equal(null);
                assert.equal(err, null);
                assert.typeOf(res.body, 'Object');
                done();
            })
        });
    })

        it('it should return all users',()=>{
            chai.request(app)
                .get('/users/0001')
                .end((err, res)=>{
                    // err.should.equal(null);
                    assert.equal(err, null);
                    assert.typeOf(res.body, 'Object');
                })
            });
});


