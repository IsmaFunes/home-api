const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    userName: { type: String, unique: true, trim: true, required: true },
    names: { type: String, required: true, trim: true },
    surName: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    isAdmin: { type: Boolean, default: false },
});

// 4. Encypt and store the person's password
User.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(person.password, salt);
    person.password = hash;
    next();
});

// 5. Confirm a person's password against the stored password
User.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);