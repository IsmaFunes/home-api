const express = require("express")
const AuthRoute = express.Router();
const authController = require('../controllers/auth.controller');
AuthRoute.post('/login', authController.login);
AuthRoute.post('/signup', authController.signup);
module.exports = AuthRoute;