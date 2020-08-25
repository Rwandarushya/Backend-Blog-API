import chai, {expect , should, assert} from 'chai'
import chaiHTTP from 'chai-http'
import app from '../index'
import bodyParser from 'body-parser'

app.use(bodyParser.json());
chai.use(chaiHTTP);

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
