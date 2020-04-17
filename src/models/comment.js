var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = new Schema({
    comment: {type: String, required: true},
    post:  {type: 'ref', model: 'Post'},
    likes: {type: Number, default: 0}
});
module.exports = mongoose.model('Comment', Comment);