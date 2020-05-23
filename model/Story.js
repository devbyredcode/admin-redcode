const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    detail : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Story', schema);