const cardModel = require('../models/card.js');
const moment = require('moment');
const axios = require('axios');
const queryString = require('query-string');

//Simple version, without validation or sanitation



exports.getOneTask = function (req, res){
    
    
    
    cardModel.findById(req.params.id, function (err, task) {

   
        //if (err) return next(err);
       // console.log(`The task is ${task}`);
        res.render('otherUpdate', {task});
        //res.send(task);
    });
}

//hello


exports.createTask = async (req, res) => {
    let task = new cardModel(
        {
            title: req.body.title,
            description: req.body.description,
            notes: req.body.notes
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






//Query the database and display saved tasks
exports.getTasks = async (req, res) => {
  // 1. Query the database for a list of all stores
  
    const tasks = await cardModel.find();
    if(tasks.date == moment().startOf('day').fromNow()){
        tasks.deletMany();
    }

    res.render('index', {tasks})



}


//Delete all tasks from the database
exports.deleteTasks = async (req, res) => {
    cardModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        //res.send('Deleted successfully!');
        res.redirect("/home");

    })
}


exports.updateTask = function (req, res) {

    let task = new cardModel(
        {
            title: req.body.title,
            description: req.body.description,
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


exports.updateTaskPage = function (req, res){
    res.render('update');
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
      let userInfo = {
          name: "Eli Finkel",
          email: "eligfinkel@gmail.com",


      }
      res.render('settings', {user: userInfo});


  }