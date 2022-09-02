const mongoose = require('mongoose');

const schemaSession = new mongoose.Schema({
    userId: String,
    userAccessToken:{
        token: String,
        expiresIn: Number
    }

    
});
module.exports = mongoose.model("sessions", schemaSession);