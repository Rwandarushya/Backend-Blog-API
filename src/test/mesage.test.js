import chai, {
    expect,
    should,
    assert
} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
app.use(bodyParser.json());

chai.use(chaiHttp);


// test get routes

describe('Get /messages', () => {

    it('it should retrieve all messages', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .get('/messages')
                    .set("Authorization", res.body.token)
                    .end((err, res) => {
                        expect(res).to.have.status('200')
                        assert.typeOf(res.body, 'Array')
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })
    it('it should not retrieve messages when you are not admin', (done) => {
        chai.request(app)
            .get('/messages')
            .end((err, res) => {
                expect(res.body.message).to.equal('unauthorized access, please login')
                expect(res).to.have.status('403')
                done();
            })
    })

    it('it should  get message of given id', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .get('/messages/5f4a421f8605ea2ea478c72e')
                    .set("Authorization", res.body.token)
                    .end((err, res) => {
                        assert.equal(res.body.msg.names, 'Hirwa Gael')
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });
    });

    // it('it should not get message when wrong id is provided',(done)=>{ 
    //     chai.request(app)
    //            .post('/auth/login')
    //            .send({email:"mugisha11@gmail.com", password:"123456"})
    //            .then(function (res) {
    //               chai.request(app)
    //                   .get('/messages/wrkkfekkjkrejkjegk')
    //                   .set("Authorization",res.body.token)
    //                   .end((err,res)=>{
    //                     expect(res).to.have.status('500')
    //                       done()
    //                   })                                 
    //            })
    //            .catch(function (err) {
    //               throw err;
    //            });
    //   });
})

//test send message route

describe('POST /messages', () => {
    it('it should save message', (done) => {
        const myMessage = {
            "names": "test@message",
            "email": "gael@gmail.com",
            "message": "greetings bantu banjye"
        }
        chai.request(app)
            .post('/messages')
            .send(myMessage)
            .end((err, res) => {
                assert.equal(err, null);
                assert.equal(res.body.message, 'Mesages saved succesfully')
                done();
            })
    });
})

// Test delete message route

describe('DELETE /messages', () => {
    it('it should not delete message when you provide wrong id', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                chai.request(app)
                    .delete('/messages/hghggygvhvhvhvhvhv')
                    .set("Authorization", res.body.token)
                    .end((err, res) => {
                        assert.equal(res.body.message, 'Error, Message not found check your id');
                        done()
                    })
            })
            .catch(function (err) {
                throw err;
            });

    })


    it('it should delete a message of a given id id', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "mugisha11@gmail.com",
                password: "123456"
            })
            .then(function (res) {
                const token = res.body.token;
                chai.request(app)
                    .get('/messages')
                    .set("Authorization", token)
                    .end(function (err, res) {
                        chai.request(app)
                            .delete('/messages/' + res.body[0]._id)
                            .set("Authorization", token)
                            .end((err, res) => {
                                console.log(res.body)
                                assert.equal(res.body.message, 'Message deleted succesfully')
                                done()
                            })
                    })
            })
            .catch(function (err) {
                throw err;
            });
    })

})

