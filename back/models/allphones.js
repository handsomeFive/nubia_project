let mongoose = require("mongoose"),
    Allphonechema = require("../schemas/allphones"),
    Allphonemodel = mongoose.model("allphones", Allphonechema);
module.exports = Allphonemodel;