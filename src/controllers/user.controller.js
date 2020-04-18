const User = require('../models/user');

const UsersController = {};

UsersController.register = async (req,res,next) => {
    try {
        const user = new User({
            userName: req.body.userName,
            names: req.body.names,
            surName: req.body.surName,
            password: req.body.password
        });
        const newUser = await user.save();
        return res.send(newUser);
    } catch (error) {
        next(error);
    }
};

module.exports = UsersController;