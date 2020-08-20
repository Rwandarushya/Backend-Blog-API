"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _posts = _interopRequireDefault(require("./model/posts.json"));

var _posts2 = _interopRequireDefault(require("./routes/posts.js"));

var _messages = _interopRequireDefault(require("./routes/messages.js"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let posts = _posts.default;
const app = (0, _express.default)();
const PORT = process.env.PORT || 3002;
app.use(_bodyParser.default.json());
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('welcome to express');
});
app.post('/login', (req, res) => {
  const user = {
    user_id: "0001",
    username: " marius robert",
    email: "robert@gmail.com"
  };

  _jsonwebtoken.default.sign({
    user
  }, 'secretkey', function (err, token) {
    res.json({
      token
    });
  });
});

function verifyToken(req, res, next) {
  //get auth header values
  const bearerHeader = req.headers['authorization']; //check if bearer is undefined

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.post('/posts', verifyToken, (req, res) => {
  _jsonwebtoken.default.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const myPost = req.body;
      posts.push(myPost);
      res.send(posts);
    }
  });
});
app.use('/messages', _messages.default);
app.use('/users', _user.default);