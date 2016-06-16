var Post = require('../models/Posts.js');

/**
*  Change Task Models to Post
*
* @description :: Server-side logic for managing Post.
*/
module.exports = {

  list: function (req, res) {
    Post.find(function (err, Post) {
      return res.json(Post);
    });
  },

  show: function (req, res) {
    var id = req.params.id;
    Post.findOne({_id: id}, function (err, Post) {
      return res.json(Post);
    });
  },

  create: function (req, res) {
    var post = new Post({
      content: req.body.content,
      fav_count: 0
    });

    post.save(function (err, post) {
      return res.json(post);
    });
  },

  update: function (req, res) {
    var id = req.params.id;
    Post.findOne({_id: id}, function (err, post) {
      post.content = req.body.content ? req.body.content : post.content;
      post.fav_count = req.body.fav_count ? req.body.fav_count : post.fav_count;
      post.save(function (err, post) {
        return res.json(post);
      });
    });
  },

  remove: function (req, res) {
    var id = req.params.id;
    Post.findByIdAndRemove(id, function (err, post) {
      return res.json(post);
    });
  }
};
