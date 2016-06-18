var Backbone = require('backbone');
var _ = require('underscore');
var StatusView = require('./StatusView.js');
var StatusModel = require('../model/StatusModel');

var FormView = Backbone.View.extend({
      el: '<div></div>',

      initialize: function(){
        this.model.on('change', this.render, this);
      },

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
      var $target = $(e.currentTarget).closest('div');
      var $form = $(e.currentTarget);
      var statusUpdate = $form.find('[name="new_content"]').val();
      this.model.set('content', statusUpdate);
      this.model.save('content', statusUpdate);
      var statusView = new StatusView({model: this.model});
      $target.html(statusView.el);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }

  });

  module.exports = FormView;
