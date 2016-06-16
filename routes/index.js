var express = require('express');
var router = express.Router();
var posts = require('../models/Posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  posts.find(function(err, posts) {
    if(err){
      console.log(err);
    }
    else {
      res.render('index', {
        title: 'Welcome to the Switter App!',
        posts: posts
      });
    }
  });
});

module.exports = router;
