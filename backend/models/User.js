const mongoose = require('mongoose');

//define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
});

const User = mongoose.model("passwordReset", userSchema);

module.exports = User;