
const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const AuthController = {};
// 2. Authentication Middleware
AuthController.ensureAuthenticated = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'TokenMissing' });
    }
    const token = req.headers.authorization.split(' ')[1];

    let payload = null;
    try {
        payload = jwt.decode(token, config.TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).send({ error: "TokenInvalid" });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ error: 'TokenExpired' });
    }
    // check if the user exists
    const person = await User.findById(payload.sub)
    if (!person) {
        return res.status(401).send({ error: 'PersonNotFound' });
    } else {
        req.user = payload.sub;
        next();
    }
};

AuthController.signup = async (req, res, next) => {
    try {
        const { userName, password, names, surName } = req.body;
        const newUser = new User({
            userName, password, names, surName
        });
        await newUser.save();
        const payload = {
            user: {
                id: newUser.userId
            }
        };

        const token = jwt.sign(
            payload,
            "randomString", {
            expiresIn: 10000
        },
        );
        return res.json(token);
    } catch (error) {
        next(error);
    }
};

AuthController.login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({
            userName
        });
        if (!user)
            return res.status(400).json({
                message: "User Not Exist"
            });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password!"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 3600
            })
        res.status(200).json({
            token
        });
    } catch (error) {
        next(error);
    }

};

module.exports = AuthController;