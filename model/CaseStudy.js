const mongoose = require('mongoose');

const schema = mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    client : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    subtitle : {
        type : String,
        required : true
    },
    client_brief : {
        type : String,
        required: true
    },
    client_problem : {
        type : String,
        required : true
    },
    our_solution : {
        type : String,
        required : true,
    },
    our_result : {
        type : String,
        required : false
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('CaseStudy', schema);