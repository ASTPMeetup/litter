var Backbone = require('backbone');
var StatusModel = require('../model/StatusModel');

var StatusCollection = Backbone.Collection.extend({
  model: StatusModel,
  url: '/posts'
});

module.exports = StatusCollection;
