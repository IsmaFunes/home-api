const Posts = require('../models/post');
const Comments = require('../models/comment');

const PostsController = {};
PostsController.createPost = async (req, res, next) => {
    try {
        const post = new Posts({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            canComment: req.body.canComment,
            author: req.body.author
        });
        await post.save();
        return res.send(post);
    } catch (err) {
        next(err);
    }

}

PostsController.commentPost = async (req, res, next) => {
    try {
        const { author, comment} = req.body;
        const postId = req.params.postId;
        const newComment = new Comments({
            author, comment, post: postId
        });
        await newComment.save();
        const updatedPost = await Posts.findById(postId);
        updatedPost.comments.push(newComment.id);
        await updatedPost.save();
        res.send(updatedPost);
    } catch (error) {
        next(error);
    }
};

PostsController.deactivateComments = async (req, res, next) => {
    try {
        const modifiedPost = await Posts.findByIdAndUpdate(req.params.postId, { canComment: false }, { new: true });
        return res.send(modifiedPost);
    } catch (error) {
        next(error);
    }

}

PostsController.delete = async (req, res, next) => {
    try {
        const modifiedPost = await Posts.findByIdAndUpdate(req.params.postId, { isDeleted: true }, { new: true });
        return res.send(modifiedPost);

    } catch (error) {
        next(error);
    }
}

PostsController.getAll = async (req, res, next) => {
    try {
        const posts = await Posts.find({ isDeleted: false })
                    .populate({
                        path:  'author', 
                        select: {names: true, surName: true, userName: true}
                    })
                    .populate({
                        path: 'comments', 
                        select: {comment: true, author: true},
                        populate: {
                            path: 'author',
                            select: {
                                userName: true
                            }
                        }
                    })
                    .lean();
        return res.send(posts);
    } catch (error) {
        next(error);
    }

}


PostsController.like = async(req,res,next) => {
    try {
        const modifiedPost = await Posts.findByIdAndUpdate(req.params.postId, { $inc: {likes: 1 } }, { new: true });
        return res.send(modifiedPost);

    } catch (error) {
        next(error);
    }
}

PostsController.dislike = async(req,res,next) => {
    try {
        const modifiedPost = await Posts.findByIdAndUpdate(req.params.postId, { $inc: {dislikes: 1 } }, { new: true });
        return res.send(modifiedPost);

    } catch (error) {
        next(error);
    }
}

module.exports = PostsController;