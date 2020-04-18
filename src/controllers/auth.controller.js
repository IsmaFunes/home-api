
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {ErrorHandler} = require('../error');

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
        const isMatch = await user.comparePassword(password);
        if (!user || !isMatch){
            throw new ErrorHandler(400, 'User does not exist or the password is incorrect'); 
        }
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