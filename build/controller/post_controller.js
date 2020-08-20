"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.deletePost = exports.getPostById = exports.createPost = exports.getAllPosts = void 0;

var _posts = _interopRequireDefault(require("../model/posts.json"));

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let posts = _posts.default;

const getAllPosts = (req, res) => {
  res.send(posts);
};

exports.getAllPosts = getAllPosts;

const createPost = (req, res) => {
  _jsonwebtoken.jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const myPost = req.body;
      posts.push(myPost);
      res.send(posts);
    }
  });
};

exports.createPost = createPost;

const getPostById = (req, res) => {
  const {
    id
  } = req.params;
  const post = posts.find(p => p.post_id === parseInt(id));
  res.send(post);
};

exports.getPostById = getPostById;

const deletePost = (req, res) => {
  const {
    id
  } = req.params;
  posts = posts.filter(p => p.post_id !== parseInt(id));
  res.send(posts);
};

exports.deletePost = deletePost;

const updatePost = (req, res) => {
  const {
    id
  } = req.params;
  const {
    post_title,
    post_body,
    author
  } = req.body;
  const myPost = posts.find(p => p.post_id === parseInt(id));

  if (post_title) {
    myPost.post_title = post_title;
  }

  if (post_body) {
    myPost.post_body = post_body;
  }

  if (author) {
    myPost.author = author;
  }

  res.send(posts);
};

exports.updatePost = updatePost;