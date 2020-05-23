const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Playground', schema);