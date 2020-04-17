var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    userName: {type: String, unique: true, trim: true, required: true},
    name: {type: String, required: true, trim: true},
    surName: {type: String, unique: true, trim: true, required: true},
    password: {type: String, unique: true, trim: true, required: true},
    isAdmin: {type: Boolean, default: false},
});
module.exports = mongoose.model('User', User);