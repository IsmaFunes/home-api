
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Post = new Schema({
    postId: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    shortDescription: String,
    type: {type: String, required: true, trim: true},
    canComment: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    likes: {type: Number, default: 0, min: 0},
    dislikes: {type: Number, default: 0, min: 0},
    createdAt: {type: mongoose.Schema.Types.Date}
});


Post.pre('save', async function (next) {
    console.log("entro en el pre")
    const post = this;
    post.createdAt = moment().utc();
    const words = post.description.split(" ");
    if(words.length > 20){
        post.shortDescription = words.splice(0, 20).join(" ") + '...';
    } else {
        post.shortDescription = post.description;
    }
    next();
});


const PostModel = mongoose.model('Post', Post);

module.exports = PostModel;