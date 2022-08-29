const mongoose = require('mongoose');

const schemaUserType = new mongoose.Schema({
    typeId: Number,
    typeName: String
});
module.exports = mongoose.model("user-types", schemaUserType);