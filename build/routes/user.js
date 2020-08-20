"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user_controller = require("../controller/user_controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', _user_controller.getAllUsers);
router.get('/:id', _user_controller.findUserById);
router.patch('/:id', _user_controller.updateUser);
router.delete('/:id', _user_controller.deleteUser);
router.get('/signup', _user_controller.registerUser);
var _default = router;
exports.default = _default;