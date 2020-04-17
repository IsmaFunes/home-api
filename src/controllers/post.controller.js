const Posts = require('../models/post');
const {ErrorHandler} = require('../error');


const PostsController = {};
PostsController.createPost = async (req, res, next) => {
    try{
        const post = new Posts({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            canComment: req.body.canComment,
            isDeleted: false,
            author: req.body.authorId
        });
        await post.save();
        return res.send(post);
    } catch(err) {
        next(err);
    }
    
}

PostsController.commentPost = async (req, res) => {

};

PostsController.deactivate = async (req, res, next) => {
    try {
        const modifiedPost = await Posts.findByIdAndUpdate(req.params.postId, {canComment: false}, {new: true});
        return res.send(modifiedPost);
    } catch (error) {
        next(error);
    }
  
}

PostsController.delete = async (req, res, next) => {
    try {
        const modifiedPost = await Posts.findByIdAndUpdate(req.params.postId, {isDeleted: true}, {new: true});
        return res.send(modifiedPost);
    
    } catch (error) {
        next(error);
    }
}

PostsController.getAll = async (req, res, next) => {
    try{
        const posts = await Posts.find({ isDeleted: false });
        return res.send(posts);
    } catch (error){
        next(error);
    }
  
}

module.exports = PostsController;