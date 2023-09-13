const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    // roles: {
    //     type: String,
    //     enum: ['user', 'admin', 'moderator'], 
    //     default: 'user'
    // },
    picturePath: {
        type: String,
        default: ""
    },
    refreshToken: String
}, {timestamps: true})

module.exports = mongoose.model('users', UserSchema); //name of collection