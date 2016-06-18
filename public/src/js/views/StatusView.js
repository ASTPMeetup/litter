var Backbone = require('backbone');
var _ = require('underscore');
var FormView = require('./FormView.js');

var StatusView = Backbone.View.extend({
  el: '<div></div>',

  initialize: function(){
    this.model.on('change', this.render, this);
  },

  template: _.template('\
    <div class="jumbotron">\
      <div class="profile_info">\
        <img src="/images/taco.gif" id="profile_pic">\
        <h3 id="profile_name"><strong>Taco Man</strong> @tacoman4life</h3>\
      </div>\
      \
      <div class="container">\
          <p><%= post.get("content") %></p>\
        \
          <img src="/images/delete.png" id="status_delete">\
          <img src="/images/update.png" id="status_update">\
          <img src="/images/fav.png" id="fav_icon">\
          <span><%= post.get("fav_count") %></span>\
      </div>\
    </div>\
    <br>\
  '),

  events: {
    'click #status_delete': 'deleteStatus',
    'click #fav_icon': 'updateFavCount',
    'click #status_update': 'updateForm'
  },

  deleteStatus: function() {
    this.model.destroy();
  },

  updateFavCount: function(){
    var fav = this.model.get('fav_count');
    this.model.set('fav_count', fav + 1);
    this.model.save('fav_count', fav + 1);
  },

  updateForm: function(e){
    e.preventDefault();
    var $target = $(e.currentTarget).closest('div');
    var formView = new FormView({model: this.model});
    formView.render();
    $target.empty();
    $target.html(formView.el);
  },

  render: function() {
    $(this.el).html(this.template({ post: this.model }));
    return this;
  }

});

module.exports = StatusView;
