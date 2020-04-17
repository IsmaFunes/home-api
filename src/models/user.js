var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    userName: {type: String, unique: true},
    name: String,
    email: String,
    surName: String,
    password: String,
    isAdmin: Boolean
});
module.exports = mongoose.model('User', User);