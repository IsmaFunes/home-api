const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const {handleError} = require('./error');
const authVerificator = require('./middlewares/auth-verify');

var app = express();
mongoose.connect('mongodb+srv://admin:admin@home-main-db-pviqq.gcp.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true}).then(db => {
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/posts', authVerificator, require('./routes/posts.route'));
    app.use('/auth', require('./routes/auth.route'));
    app.use((err, req, res, next) => {
        handleError(err, res);
    });
    app.listen(3000, () => {
        console.log("Listening at port 3000...");
    });
});


