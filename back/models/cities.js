let mongoose = require("mongoose"),
    Citychema = require("../schemas/cities"),
    Citymodel = mongoose.model("citys", Citychema);
module.exports = Citymodel;