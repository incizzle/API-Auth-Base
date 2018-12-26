const mongoose = require('mongoose');

const bruteSchema = mongoose.Schema({
    _id: String,
    data: {
        count: Number,
        lastRequest: Date,
        firstRequest: Date
    },
    expires: Date
});

module.exports = mongoose.model('Brute', bruteSchema);