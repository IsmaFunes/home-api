const express = require("express")
const PostsRoute = express.Router();
const postController = require('../controllers/post.controller');
const authVerify = require('../middlewares/auth-verify');

PostsRoute.route('/create').post(authVerify, postController.createPost);
PostsRoute.get('', postController.getAll);
PostsRoute.delete('/:postId', authVerify, postController.delete);
PostsRoute.put('/:postId/comment', authVerify, postController.commentPost);
PostsRoute.put('/:postId/like', authVerify,postController.like);
PostsRoute.get('/:postId', postController.getPost);

module.exports = PostsRoute;