let mongoose = require("mongoose"),
    Locationschema = mongoose.Schema({
        userId:Number,
        locationId:Number,
        name:String,
        addr:String,
        phonenum:String,
        isDefault:Boolean
    });
module.exports = Locationschema;