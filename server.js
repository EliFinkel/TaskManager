
//app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');

const path = require('path');



//hello world

const routes = require('./Routes/home.js'); // Imports routes for the products
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));


// Set up mongoose connection
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://eli:eli16821@card-qxsw8.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));


app.use('/', routes);



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

passport.use(new GoogleStrategy({
  consumerKey: '673316106874-uadmbsdhpnildop9bqqjfiennl3b5lec.apps.googleusercontent.com',
  consumerSecret: 'HKrsoePGmPWYbqyEZ4Mx9zzw',
  callbackURL: "http://rutine.herokuapp.com/"
},
function(token, tokenSecret, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
}
));





let port = process.env.PORT || 7777;
app.use(express.static(__dirname));
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});