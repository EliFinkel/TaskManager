const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController.js');
const { google } = require('googleapis');




//Security Block
const OAuth2Data = {"web":{"client_id":"55339819676-3ph8pul009u9cm41s753tt3cjengav4k.apps.googleusercontent.com","project_id":"quickstart-1583688064868","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"q4vzHWZt-OSBgfeSKOsvKfNJ","redirect_uris":["http://localhost:8080/auth/google/callback"],"javascript_origins":["http://localhost:8080"]}}
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;
//End Security Block



router.get('/add', cardController.createTaskPage)
router.post('/add', cardController.createTask);
router.get('/', cardController.getTasks);
router.post('/:id/delete', cardController.deleteTasks);
router.get('/:id/delete', cardController.deleteTasks);
router.post('/:id/update', cardController.updateTask);
router.get('/logOut', (req,res) => {
    authed = false;
    console.log('Logged Out');
    res.redirect('/login');
})
//TODO fix error
//router.get('/:id', cardController.getOneTask);
//router.get('/login', cardController.getLoginPage);





router.get('/login', (req, res) => {
if (!authed) {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/gmail.readonly'
        });
        console.log(url)
        res.redirect(url);
} else {
        /*const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
        gmail.users.labels.list({
            userId: 'me',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const labels = res.data.labels;
            if (labels.length) {
                console.log('Labels:');
                labels.forEach((label) => {
                    console.log(`- ${label.name}`);
                });
            } else {
                console.log('No labels found.');
            }
        });*/
        res.send('Logged in')
        res.redirect('/');

    }
})

router.get('/auth/google/callback', function (req, res) {
    const code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/')
            }
        });
    }
});





module.exports = router;