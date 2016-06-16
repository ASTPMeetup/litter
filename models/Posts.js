var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var taskSchema = new Schema({
    'content': String,
    'fav_count': Number
});

module.exports = mongoose.model('Posts', taskSchema);
