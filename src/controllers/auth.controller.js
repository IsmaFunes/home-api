
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const AuthController = {};

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