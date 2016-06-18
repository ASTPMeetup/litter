var Backbone = require('backbone');

var StatusModel = Backbone.Model.extend({
      urlRoot: '/posts',
      idAttribute: '_id',
      content: '',
      fav_count: ''
});

module.exports = StatusModel;
