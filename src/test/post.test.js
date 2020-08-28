import chai, {expect, should, assert} from 'chai';
import chaiHttp from 'chai-http'
import app from '../index.js';
import bodyParser from 'body-parser'
import mongoose, { set } from 'mongoose'
app.use(bodyParser.json());

chai.use(chaiHttp);




describe('POST /post',()=>{
    beforeEach(function(){
        mongoose.connect('mongodb+srv://marius:marius@cluster0.0vsjl.mongodb.net/myDB?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    });

    afterEach(function(){
        mongoose.disconnect();
    })

    it('it should create new post',(done)=>{
        //mock test
        const myPost={    
            "post_title": "Web development processs",
            "post_body": "information gathering, planning, design , implementing, testing and deployin, maintenamce",
            "author": "Gael Hirwa",
            "author_email":"manzi@yahoo.fr"
         }
        chai.request(app)
            .post('/posts')
            .set("Authorization", "hhhh")
            .send(myPost)
            .end((err,res)=>{
                console.log(res.body);
                assert.equal(err, null);
                assert.equal(res.body.message, "Un authorized access, your token is not valid!!!")
                done()
            })
    }) 
})


    


