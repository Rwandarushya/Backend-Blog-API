"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMessage = exports.createMessage = exports.findMessageById = exports.getAllMessages = void 0;

var _messages = _interopRequireDefault(require("../model/messages.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let messages = _messages.default;

const getAllMessages = (req, res) => {
  res.send(messages);
};

exports.getAllMessages = getAllMessages;

const findMessageById = (req, res) => {
  const {
    id
  } = req.params;
  const message = messages.find(msg => msg.id === id);
  res.send(message);
};

exports.findMessageById = findMessageById;

const createMessage = (req, res) => {
  myMessage = req.body;
  messages.push(myMessage);
  res.send(messages);
};

exports.createMessage = createMessage;

const deleteMessage = (req, res) => {
  const {
    id
  } = req.params;
  messages = messages.filter(msg => msg.id !== id);
  res.send(messages);
};

exports.deleteMessage = deleteMessage;