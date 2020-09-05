import chai, { expect,should, assert, Assertion} from 'chai';
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

    it('it should retrieve user of a given id', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                const token = res.body.token;
                chai.request(app)
                    .get('/users')
                    .set("Authorization", token)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/users/' + res.body[0]._id)
                            .set("Authorization", token)
                            .end((err, res) => {
                                assert.equal(err, null)
                                expect(res.body).to.have.property('email')
                                expect(res.body).to.have.property('role')
                                done();
                            })
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })

    it('it should not retrieve users when you are not logged in', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.body.message,'unauthorized access, please login')
                expect(res.status).to.equal(403)
                done()
            })
    })
  
    it('it should not retrieve users info when you are not admin', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "jane@gmail.com",
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
                email: "jane@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .get('/users/5f47f558c91a2d337c56dcfa')
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
                        assert.equal(err, null)
                        expect(res.body.message).to.equal('Could not find that user')
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })
})



describe('PATCH /users', () => {

    before(() => {
        const newUser = new Users({
          first_name: "TestfirstName",
          last_name: "Test lastname",
          email: "guest@test.com",
          role: "guest",
          password: "123456"
        });
        newUser.save().then(res => {}).catch(err => {
          console.log(err)
        });
        
      })
    
      after(()=>{
        Users.deleteOne({ email: 'guest@test.com'})
              .exec()
              .then(res => {})
              . catch(err => {  console.log(err); });
      })
 
    it('it should update user info', (done) => {
        const UserInfo = {
            first_name: "newfirstName",
            last_name: "newlastname",
            role: "admin",
        };
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                const token = res.body.token;
                chai.request(app)
                    .get('/users')
                    .set("Authorization", token)
                    .end((err, res) => {
                        chai.request(app)
                            .patch('/users/' + res.body[res.body.length-1]._id)
                            .set("Authorization", token)
                            .send(UserInfo)
                            .end((err, res) => {
                                assert.equal(err, null)
                                assert.equal(res.body.message,'User updated successfully!')
                                done();
                            })
                    })
            })
            .catch(function (err) {
                throw err;
            });

    })

});

describe('DELETE /users', ()=>{
    before(() => {
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

    it('it should delele user',(done)=>{
        chai.request(app)
        .post('/auth/login')
        .send({
            email: "mugisha11@gmail.com",
            password: "123456"
        })
        .then(function (res) {
            const token= res.body.token
            chai.request(app)
                .get('/users')
                .set("Authorization", token)
                .end((err, res) => {
                    chai.request(app)
                        .delete('/users/'+res.body[res.body.length-1]._id)
                        .set("Authorization", token)
                        .end((err, res)=>{
                        assert.equal(err, null)
                        expect(res.body.message).to.equal('User deleted succesfully')
                        done()
                        })
                })
        })
        .catch(function (err) {
            throw err;
        });
            
    })

})
