import chai, {
    expect,
    should,
    assert,
    Assertion
} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs'
import Users from '../model/user_model'
app.use(bodyParser.json());

chai.use(chaiHttp);

describe('GET /users', () => {
    it('it should retrieve all users when logged in as admin', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .get('/users')
                    .set("Authorization", res.body.token)
                    .end((err, res) => {
                        assert.equal(err, null);
                        assert.typeOf(res.body, 'Array')
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });

    })
    it('it should not retrieve users info when you are not admin', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "chris@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .get('/users')
                    .set("Authorization", res.body.token)
                    .end((err, res) => {
                        assert.equal(err, null);
                        assert.equal(res.body.message, 'Unable to perfom this action, You are not admin!')
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })
    it('it should not retrieve user of a given id when your are not admin', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "chris@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .get('/users/5f47f558c91a2d337c56dcfa')
                    .set("Authorization", res.body.token)
                    .end((err, res) => {
                        assert.equal(err, null);
                        assert.equal(res.body.message,'Unable to perfom this action, You are not admin!')
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })

    it('it should retrieve user of a given id', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .get('/users/5f47f43e27996123d809c1ab')
                    .set("Authorization", res.body.token)
                    .end((err, res) => {
                        assert.equal(err,null)
                        assert.equal(res.body.last_name,'Jane')
                        expect(res.body.role).to.equal('admin')
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })

    it('it should not retrieve user on wrong id', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .get('/users/wrongiddddddddddjdj')
                    .set("Authorization", res.body.token)
                    .end((err, res) => {
                        assert.equal(err,null)
                        expect(res.body.message).to.equal('Could not find that user')
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })
})



describe('PATCH /users', ()=>{
    beforeEach(() => {
        const newUser = new Users({
          first_name: "testfirstName",
          last_name: "tets lastname",
          email: "test@test.com",
          role: "admin",
          password: "testpassword"
        });
        newUser.save().then(res => {
        
          })
          .catch(err => {
            console.log(err)
          });
      });
    
    afterEach(() => {
        Users.remove({email:'test@test.com'})
            .exec()
            .then(res=>{
                
            }).
            catch(err=>{
                console.log(err);
            });
      });
    it('it should not update when no token provide',(done)=>{
        chai.request(app)
            .patch('/users/5f48008db891032b10d6e332')
            .end((err, res)=>{
                assert.equal(err,null)
                assert.equal(res.body.message, 'unauthorized access, please login')
                done();
            })
    })



    it('it should throw the internal error', (done)=>{
        chai.request(app)
        .post('/auth/login')
        .send({email:"chris@gmail.com", password:"123456"})
        .then(function (res) {
            chai.request(app)
            .patch('/users/5f48008db891032b10d6e332')
            .set("Authorization",res.body.token)
            .end((err, res)=>{
                    expect(res).to.have.status('401')
                    console.log(res.body);
                    done();
                })                                           
        })
        .catch(function (err) {
           throw err;
        });   
    })
})


