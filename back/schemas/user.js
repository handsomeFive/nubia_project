let mongoose = require("mongoose"),
    Userschema = mongoose.Schema({
        username: String,
        password: String,
        userId: Number,
        phonenum: String,
        emailaddr: String
    });
module.exports = Userschema;