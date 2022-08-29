const mongoose = require('mongoose');

const schemaUsers = new mongoose.Schema({
    userId: String,
    userName: String,
    userPassword: String,
});
module.exports = mongoose.model("users", schemaUsers);