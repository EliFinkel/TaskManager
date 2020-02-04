const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


let cardSchema = new Schema({
    title: {type: String},

    description: {type: String},

    notes: {type: String},

    date: {type: String,default: moment().format('dddd'),required: true},

    userId: {type: String, required: true},

    project: {type: String, required: true},

    endDate: {type: String},

    
});


module.exports = mongoose.model('Card', cardSchema);
