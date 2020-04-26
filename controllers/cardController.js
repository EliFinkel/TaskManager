const cardModel = require('../models/card.js');
const express = require('express');
const moment = require('moment');
const axios = require('axios');
const queryString = require('query-string');
const router = require('../Routes/home.js');
const { google } = require('googleapis');
const OAuth2Data = {"web":{"client_id":"930100384443-9208pp2f61p0v1vvs31lc8mb0cafv5jm.apps.googleusercontent.com","project_id":"rutine","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"DqVuV9IU6jO_bPAXHN0whbd9","redirect_uris":["http://localhost:8080/auth/google/callback"],"javascript_origins":["http://localhost:8080"]}};
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;
//var userEmail = "";









exports.createTask = async (req, res) => {
    var cookieString = req.headers.cookie;
    var email = extractCookieValue(cookieString, "securityContextId");
    let task = new cardModel(
        {
            title: req.body.title,
            description: req.body.description,
            notes: req.body.notes,
            dueDate: req.body.dueDate,
            status: req.body.status,
            emailId: email

        }
    );

    const tasks = await cardModel.find();
    for(var i = 0; i < tasks.length; i++){
        
        if(task.title == tasks[i].title || task.description == tasks[i].description){
           // alert('That Video Already Exists :');
            res.redirect('/home');
            return;
            
        }
        
    }
    if(task.title == ""){
        //alert('You Are Missing Something!');
        //res.redirect('/add');
        console.log("Thats empty");
        res.redirect('/home');
        return;
        
    }

   
    
    

    task.save(function (err) {
        if (err) {
            console.log(err);
            return err;
        }
        console.log('Task Succesfully Created');
        res.redirect('/home');
      
    
    });
};


//userContextId

function extractCookieValue(cookieString, cookieName){

    var pos = cookieString.indexOf(cookieName + "=");
    var pos2 = cookieString.indexOf(";", pos);
    var value = "";
    //console.log("p1: " + pos + " p2: " + pos2 + " cookieString: " + cookieString);
    

    if(pos >= 0 && pos2 == -1){
        pos = pos + cookieName.length + 1;
        value = cookieString.substring(pos);
        //console.log("value: " + value);
    }
    else if(pos >= 0 && pos2 >= 0){
        pos = pos + cookieName.length + 1;
        value = cookieString.substring(pos,pos2);
        
        
    }

    

    return value;
}


//Query the database and display saved tasks
exports.getTasks = async (req, res) => {
    var cookieString = req.headers.cookie;

    console.log("CookieString: " + cookieString);
    var email = extractCookieValue(cookieString, "securityContextId");
    console.log("Email: " + email);
    //console.log("Email: " + email); 
    
    if(email == null || email.length < 10){
        res.redirect('/')
        console.log("Something is wrong with your email!")
    }
    else{
        
        const tasks = await cardModel.find({emailId:  email});
    
        res.render('index', {tasks});
    }
    
        
}
    
 




//Delete all tasks from the database
exports.deleteTasks = async (req, res) => {
    cardModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        //res.send('Deleted successfully!');
        res.redirect("/home");

    })
}

exports.getTask = function (req, res){
    
    
    
    cardModel.findById(req.params.id, function (err, task) {
        //if (err) return next(err);
       // console.log(`The task is ${task}`);
        let date = moment().format('dddd');
        console.log(task);
        res.render('otherUpdate', {task, date});
        //res.send(task);
    });
}

exports.updateTask = function (req, res) {

    let task = new cardModel(
        {
            title: req.body.title,
            description: req.body.description,
            notes: req.body.notes,
            dueDate: req.body.dueDate,
            status: req.body.status
        });

    console.log(task);
    console.log(req.params.id);
    cardModel.findOneAndUpdate(req.params.id, {$set: req.body}, function (err, task) {

        console.log(task);  
        if (err) return next(err);
    // res.send('Product updated.');
        res.redirect("/home");

    });
};


exports.updateTaskPage = async (req, res) => {
    const task = await cardModel.find();
    res.render('otherUpdate');
}

exports.createTaskPage = function (req, res){
    let date = moment().format('dddd');
    res.render('newAdd', {date});
}

exports.getLoginPage = function (req, res){

const stringifiedParams = queryString.stringify({
    client_id: '673316106874-uadmbsdhpnildop9bqqjfiennl3b5lec.apps.googleusercontent.com',
    redirect_uri: 'http://10.1.10.158:8080',
    scope: [
      'https://www.googleapis.com/auth/eligfinkel@gmail.com',
      'https://www.googleapis.com/auth/Eman123',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    res.render('login', googleLoginUrl);
}


  
  
exports.getAccessTokenFromCode = async function getAccessTokenFromCode(code) {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: '673316106874-uadmbsdhpnildop9bqqjfiennl3b5lec.apps.googleusercontent.com',
        client_secret: 'HKrsoePGmPWYbqyEZ4Mx9zzw',
        redirect_uri: 'http://10.1.10.158:8080',
        grant_type: 'authorization_code',
        code,
      },
    });
    console.log(data); // { access_token, expires_in, token_type, refresh_token }
    return data.access_token;
  };

  exports.getLandingPage = (req,res) => {
      res.render('landing');
  }


  exports.settings = async function (req,res){
      
    var cookieString = req.headers.cookie;
    var email = extractCookieValue(cookieString, "securityContextId");
    let userInfo = {
          email: email


      }
      res.render('settings', {user: userInfo});


  }


  exports.getProjectView = function (req, res){
        res.render('projetcsView');
  }


/*exports.sendReminder = (req,res) => {
   
}*/




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