var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = new Schema({
    commentId: mongoose.Schema.Types.ObjectId,
    comment: {type: String, required: true},
    post:  {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    likes: {type: Number, default: 0}
});
module.exports = mongoose.model('Comment', Comment);