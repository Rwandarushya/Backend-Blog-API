"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = exports.deleteUser = exports.updateUser = exports.findUserById = exports.getAllUsers = void 0;

var _users = _interopRequireDefault(require("../model/users.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let users = _users.default;

const getAllUsers = (req, res) => {
  res.send(users);
};

exports.getAllUsers = getAllUsers;

const findUserById = (req, res) => {
  const {
    id
  } = req.params;
  const user = users.find(us => us.user_id === id);
  res.send(user);
};

exports.findUserById = findUserById;

const updateUser = (req, res) => {
  const {
    id
  } = req.params;
  const {
    first_name,
    last_name,
    role
  } = req.body;
  const myUser = users.find(p => p.user_id == id);

  if (first_name) {
    myUser.first_name = first_name;
  }

  if (last_name) {
    myUser.last_name = last_name;
  }

  if (role) {
    myUser.role = role;
  }

  res.send(users);
};

exports.updateUser = updateUser;

const deleteUser = (req, res) => {
  const {
    id
  } = req.params;
  users = users.filter(us => us.user_id !== id);
  res.send(users);
};

exports.deleteUser = deleteUser;

const registerUser = (req, res) => {
  res.send('register');
};

exports.registerUser = registerUser;