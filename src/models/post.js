
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = new Schema({
    postId: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    type: {type: String, required: true, trim: true},
    canComment: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true}],
    likes: {type: Number, default: 0}
});
const PostModel = mongoose.model('Post', Post);
module.exports = PostModel;