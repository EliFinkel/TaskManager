const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController.js');
const { google } = require('googleapis');




//Security Block
const OAuth2Data = {"web":{"client_id":"930100384443-9208pp2f61p0v1vvs31lc8mb0cafv5jm.apps.googleusercontent.com","project_id":"rutine","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"DqVuV9IU6jO_bPAXHN0whbd9","redirect_uris":["http://localhost:8080/auth/google/callback"],"javascript_origins":["http://localhost:8080"]}};

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;
//End Security Block



router.get('/add', cardController.createTaskPage)
router.post('/add', cardController.createTask);
router.get('/home', cardController.getTasks);
router.get('/', cardController.getLandingPage);
router.post('/:id/delete', cardController.deleteTasks);
router.get('/:id/delete', cardController.deleteTasks);
router.get('/:id/update', cardController.getTask);
router.post('/:id/update', cardController.updateTask);
router.get('/settings', cardController.settings);
router.get('/logOut', (req,res) => {
    authed = false;
    res.redirect('/');
})

router.get('/projects', cardController.getProjectView);
//TODO fix error with id







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
        
        //res.redirect('/home');

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
                var date = new Date();
                sendMessage(`You Logged into Rutine at ${date}`)
                res.redirect('/home')
            }
        });
    }
});



function sendMessage(userMessage){
    const accountSid = 'AC97874c35dc05a571cd9ce712d46d9361';
    const authToken = '89db1e88f70122b6c660bd447e8484bc';
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: userMessage,
        from: '+19384448988',
        to: '+16102903339'
    })
    .then(message => console.log(message.sid));


}





module.exports = router;