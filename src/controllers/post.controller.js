const Posts = require('../models/post');
const PostsController = {};
PostsController.createPost = async(req, res) => {
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
} 

PostsController.commentPost = async(req,res) => {

};

PostsController.deactivate = async(req,res) => {

}

PostsController.getAll = async(req,res) => {
    console.log("ENTRO")
    const posts = await Posts.find(); 
    return res.send(posts);
}

module.exports = PostsController;