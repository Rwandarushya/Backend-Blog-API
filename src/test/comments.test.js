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

describe('Get /All comments', () => {
  beforeEach(function () {
    mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  });

  afterEach(function () {
    mongoose.disconnect();
  });
  it('it should  retrieve all comments if post exist', (done) => {
    chai.request(app)
      .get('/comments/5f4a3d61137fc52900ad8420')
      .end((err, res) => {
        assert.typeOf(res.body, 'Array')
        done()
      })
  });

  it('it should show error message when trying to get comments of ',(done)=>{
    chai.request(app)
    .get('/comments/wronndidddd')
    .end((err, res) => {
      assert.equal(err, null)
      assert.equal(res.body.message,'Error, Post not found check your id')
      done()
    })
  })

})

