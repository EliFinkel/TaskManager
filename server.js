
//app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const queryString = require('query-string');
const path = require('path');
const axios = require('axios');
const config = require('config');
const { google } = require('googleapis');
var session = require('express-session');
//Security Block

const googleConfig = config.get("rutine.googleConfig");
const OAuth2Data = {"web":{"client_id":googleConfig.clientId,"project_id":"rutine","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":googleConfig.clientSecret,"redirect_uris":["http://localhost:8080/auth/google/callback"],"javascript_origins":["http://localhost:8080"]}}

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;
//End Security Block





const routes = require('./Routes/home.js'); // Imports routes for the products
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/ejs'));
app.set('view engine', 'ejs');


app.use('/static', express.static('public'))

app.use(bodyParser.urlencoded({
  extended: true
}));

const mongoConfig = config.get('rutine.mongoConfig');
// Set up mongoose connection
const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://eli:eli16821@card-qxsw8.mongodb.net/Tasks?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  })
mongoose.connect(mongoConfig.host, { useNewUrlParser: true, useUnifiedTopology: true  })
mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));


app.use('/', routes);



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






let port = process.env.PORT || 8080;
app.use(express.static(__dirname));
app.listen(port, () => {
    console.log('[+]Server is up and running on port number ' + port);
    
});