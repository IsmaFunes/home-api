const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');

var app = express();
mongoose.connect('mongodb+srv://admin:admin@home-main-db-pviqq.gcp.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true}).then(db => {
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/posts', require('./routes/posts.route'))
    app.listen(3000, () => {
        console.log("Listening at port 3000...");
    });
});


