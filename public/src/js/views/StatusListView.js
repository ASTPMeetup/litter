var Backbone = require('backbone');

var StatusView = require('./StatusView.js');

var StatusListView = Backbone.View.extend({
  el: '<div></div>',

  initialize: function(){
    this.listenTo(this.collection, "update", this.render);
  },

  render: function() {
    var list = this;
    $(this.el).html('');
    this.collection.each(function(post){
      var statusView = new StatusView({ model: post });
      $(list.el).prepend(statusView.render().el);
    });
   return this;
  }

});

module.exports = StatusListView;
