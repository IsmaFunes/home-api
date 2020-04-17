const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

var app = Express();
Mongoose.connect('mongodb+srv://admin:admin@home-main-db-pviqq.gcp.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Listening at port 3000...");
});