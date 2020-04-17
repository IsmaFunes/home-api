
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = new Schema({
    postId: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    type: String,
    canComment: Boolean,
    isDeleted: Boolean,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
const PostModel = mongoose.model('Post', Post)
module.exports = PostModel;