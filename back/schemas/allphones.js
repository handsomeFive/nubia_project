let mongoose = require("mongoose"),
    Allphonechema = mongoose.Schema({
        imgSrc: String,
        name: String,
        originalPrice: String,
        bargain: Number,
        bargainPrice: String,
        saveMoney: Number
    });
module.exports = Allphonechema;