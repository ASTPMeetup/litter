$(document).ready(function(){
  var StatusModel = Backbone.Model.extend({
        urlRoot: '/posts',
        idAttribute: '_id',
        content: '',
        fav_count: '',
  });

  var StatusCollection = Backbone.Collection.extend({
    model: StatusModel,
    url: '/posts'
  });




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

  var FormView = Backbone.View.extend({
      el: '<div></div>',

      template: _.template('\
            <form name="post_input" id="edit_status_form">\
                <textarea form="form" name="new_content" type="text" class="content_input" rows="3" required></textarea>\
                <br><input type="submit" value="submit" class="button">\
            </form>\
      '),

    events: {
      'submit #edit_status_form': 'updateStatus'
    },

    updateStatus: function(e){
      e.preventDefault();
      var $form = $(e.currentTarget);
      var statusUpdate = $form.find('[name="new_content"]').val();
      this.model.set('content', statusUpdate);
      this.model.save('content', statusUpdate);
      statusCollection.fetch();
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });


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

  var statusCollection = new StatusCollection();

  statusCollection.fetch({
      success: function(posts){
        console.log('collection fetch working', posts);
        var statusListView = new StatusListView({collection: statusCollection});
        $('#app').html(statusListView.render().el);
      }
  });

  $('#form').submit(function(e){
    e.preventDefault();
    var $form = $(e.currentTarget);
    var content = $form.find('[name="content"]').val();
    var newStatus = new StatusModel({content: content});
    newStatus.save();
    statusCollection.add(newStatus);
    $('#form').each(function(){this.reset();});
  });
});
