var express = require('express');
var router = express.Router();
var postController = require('../controllers/Post_Controller.js');

router.get('/', function (req, res) {
  postController.list(req, res);
});

router.get('/:id', function (req, res) {
  postController.show(req, res);
});

router.post('/', function (req, res) {
  postController.create(req, res);
});

router.put('/:id', function (req, res) {
  postController.update(req, res);
});

router.delete('/:id', function (req, res) {
  postController.remove(req, res);
});

module.exports = router;
