const mongoose = require('mongoose');

const schemaUserRoles = new mongoose.Schema({
    roleId: Number,
    roleName: String
});
module.exports = mongoose.model("user-roles", schemaUserRoles);