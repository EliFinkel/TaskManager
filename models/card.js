const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


let cardSchema = new Schema({
    title: {type: String},

    description: {type: String},

    notes: {type: String},

    date: {type: String,default: moment().format('dddd'),required: true},

    userId: {type: String, required: false},

    emailId: {type: String, required: false},

    project: {type: String, required: false},

    dueDate: {type: String, default: "No Date", required: false}, 

    completed: {type: Boolean, default: false},

    status: {type: String, default: "Working On It", required: true}

    
});


module.exports = mongoose.model('Card', cardSchema);
