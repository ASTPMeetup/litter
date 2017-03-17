var Backbone = require('backbone');
var _ = require('underscore');
var FormView = require('./FormView.js');

var StatusView = Backbone.View.extend({
  el: '<div></div>',

  initialize: function(){
    this.model.on('change', this.render, this);
    this.listenTo(this.model, 'update', this.render);
  },

  template: _.template('\
    <div class="jumbotron">\
      <div class="profile_info">\
        <img role="presentation" src="/images/taco.gif" class="profile_pic" alt="profile picture">\
        <h3 class="profile_name"><strong>Taco Man</strong> @tacoman4life</h3>\
      </div>\
      \
      <div role="list" class="container">\
          <p role="listitem" class="content_p"><%= post.get("content") %></p>\
        \
          <img role="button" src="/images/delete.png" class="status_delete" alt="delete item button">\
          <img role="button" src="/images/update.png" class="status_update" alt="update item button">\
          <img role="button" src="/images/fav.png" class="fav_icon" alt="increase likes button">\
          <span role="listitem"><%= post.get("fav_count") %></span>\
      </div>\
    </div>\
    <br>\
  '),

  events: {
    'click .status_delete': 'deleteStatus',
    'click .fav_icon': 'updateFavCount',
    'click .status_update': 'updateForm'
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
