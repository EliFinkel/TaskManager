const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb+srv://eli:eli16821@card-qxsw8.mongodb.net/test?retryWrites=true&w=majority';








// Set up mongoose connection
const mongoose = require('mongoose');

mongoose.connect('url', { useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = new Database();