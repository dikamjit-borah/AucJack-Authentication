const mongoose = require('mongoose');

const schemaUserTypes = new mongoose.Schema({
    typeId: Number,
    typeName: String
});
module.exports = mongoose.model("user-types", schemaUserTypes);