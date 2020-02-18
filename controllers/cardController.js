const cardModel = require('../models/card.js');
const moment = require('moment');
//Simple version, without validation or sanitation



/*exports.getOneTask = function (req, res){
    cardModel.findById(req.params.id, function (err, task) {
        //if (err) return next(err);
        res.render('update', {task: task});
        //res.send(product);
    })
}*/



exports.createTask = function (req, res) {
    let task = new cardModel(
        {
            title: req.body.title,
            description: req.body.description
        }
    );


    //TODO parse date for unfilled models
    /*if(card.title == '' && card.description == ''){
        return;
        res.redirect('/add')
    }*/

    task.save(function (err) {
        if (err) {
            return (err);
        }
        const accountSid = 'AC97874c35dc05a571cd9ce712d46d9361';
        const authToken = '89db1e88f70122b6c660bd447e8484bc';
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
          .create({
             body: `New Task From Rutine: ${task.title}.`,
             from: '+19384448988',
             to: '+16102903339'
           })
          .then(message => console.log(message.sid));
        
       
    })
        console.log('Task Succesfully Created');
        res.redirect('/');  
   
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
        res.redirect("/");

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
    res.redirect("/");

});
};


exports.updateTaskPage = function (req, res){
    res.render('update');
}

exports.createTaskPage = function (req, res){
    let date = moment().format('dddd');
    res.render('create', {date});
}

exports.getLoginPage = function (req, res){
    res.render('login');
}