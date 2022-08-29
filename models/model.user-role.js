const mongoose = require('mongoose');

const schemaUserRole = new mongoose.Schema({
    roleId: Number,
    roleName: String
});
module.exports = mongoose.model("user-roles", schemaUserRole);