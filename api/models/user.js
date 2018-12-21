const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        required: true
    },
    lastloginAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    picture: {
        type: String
    },
    role: {
        type: String
    }, 
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String, 
        required: true,
        match: /.{3,}/ 
    }
});

module.exports = mongoose.model('User', userSchema);