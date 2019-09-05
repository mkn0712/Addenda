

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },

    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    email: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String
    },

}, {
    timestamps: true
});

var user = mongoose.model('User', userSchema);

module.exports = user;