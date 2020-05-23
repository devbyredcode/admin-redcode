const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    avatar : {
        type : String,
        default : 'main-avatar.jpg'
    },
    firstname : {
        type : String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : false
    },
    linkedin : {
        type : String,
        required : false
    },
    roles : {
        type : String,
        required : true
    },
    is_active : {
        type : String,
        default: '0'
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', schema);