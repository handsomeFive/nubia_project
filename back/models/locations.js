let mongoose = require("mongoose"),
    Locationschema = require("../schemas/locations"),
    Locationsmodel = mongoose.model("locations", Locationschema);
module.exports = Locationsmodel;