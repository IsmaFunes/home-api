const express = require("express")
const AuthRoute = express.Router();
const authController = require('../controllers/auth.controller');
const authVerify = require('../middlewares/auth-verify');

AuthRoute.post('/login', authController.login);
AuthRoute.post('/signup', authController.signup);
AuthRoute.get('/me', authVerify, authController.me);
module.exports = AuthRoute;