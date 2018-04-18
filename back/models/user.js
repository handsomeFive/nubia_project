let mongoose = require("mongoose"),
    Userschema = require("../schemas/user"),
    Usermodel = mongoose.model("users", Userschema);
module.exports = Usermodel;