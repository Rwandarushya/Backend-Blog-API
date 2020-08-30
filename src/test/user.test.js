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
import mongoose, {
    set
} from 'mongoose'
app.use(bodyParser.json());

chai.use(chaiHttp);

describe('GET /users', () => {
    var token = '';
    beforeEach(function () {
        mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    });

    afterEach(function () {
        mongoose.disconnect();
    })

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
                    .get('/users/5f47f558c91a2d337c56dcfa')
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