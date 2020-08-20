"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _message_controller = require("../controller/message_controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', _message_controller.getAllMessages);
router.get('/:id', _message_controller.findMessageById);
router.post('/', _message_controller.createMessage);
router.delete('/:id', _message_controller.deleteMessage);
var _default = router;
exports.default = _default;