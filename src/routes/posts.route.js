const express = require("express")
const PostsRoute = express.Router();
const postController = require('../controllers/post.controller');
PostsRoute.route('/create').post(postController.createPost);
PostsRoute.get('', postController.getAll);
PostsRoute.delete('/:postId', postController.delete);
module.exports = PostsRoute;