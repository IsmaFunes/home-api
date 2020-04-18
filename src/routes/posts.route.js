const express = require("express")
const PostsRoute = express.Router();
const postController = require('../controllers/post.controller');
PostsRoute.route('/create').post(postController.createPost);
PostsRoute.get('', postController.getAll);
PostsRoute.delete('/:postId', postController.delete);
PostsRoute.put('/:postId/comment', postController.commentPost)
PostsRoute.put('/:postId/like', postController.like)
PostsRoute.put('/:postId/dislike', postController.dislike)
module.exports = PostsRoute;