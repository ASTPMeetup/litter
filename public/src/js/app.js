window.$ = window.jQuery = require('jquery');

var StatusCollection = require('./collections/StatusCollection.js');
var StatusModel = require('./model/StatusModel.js');
var StatusListView = require('./views/StatusListView.js');

$(document).ready(function(){


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
