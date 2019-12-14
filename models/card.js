const mongoose = require('mongoose');
const Schema = mongoose.Schema;



let cardSchema = new Schema({
    title: {type: String},

    description: {type: String,},

    date: {type: Date,default: new Date(),required: true}
});


module.exports = mongoose.model('Card', cardSchema);
