var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = new Schema({
    comment: String,
    post:  {type: 'ref', model: 'Post'},
    likes: Number
});
module.exports = mongoose.model('Comment', Comment);