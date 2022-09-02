const mongoose = require('mongoose');

const schemaUsers = new mongoose.Schema({
    userId: String,
    userName: String,
    userPhone: String,
    userEmail: String,
    userPassword: String,
    userType: Number,
    userRole: Number
});
module.exports = mongoose.model("users", schemaUsers);