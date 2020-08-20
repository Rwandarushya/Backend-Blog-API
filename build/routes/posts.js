"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _post_controller = require("../controller/post_controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', _post_controller.getAllPosts);
router.post('/', _post_controller.createPost);
router.get('/:id', _post_controller.getPostById);
router.delete('/:id', _post_controller.deletePost);
router.patch('/:id', _post_controller.updatePost);
var _default = router;
exports.default = _default;