const cardModel = require('../models/card.js');

//Simple version, without validation or sanitation



exports.getOneTask = function (req, res){
    cardModel.findById(req.params.id, function (err, task) {
        //if (err) return next(err);
        res.render('update', {task: task});
        //res.send(product);
    })
}



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
            return next(err);
        }
        console.log('Task Succesfully Created');
        res.redirect('/');

       
    })
};






//Query the database and display saved tasks
exports.getTasks = async (req, res) => {
  // 1. Query the database for a list of all stores
    const tasks = await cardModel.find();
    res.render('index', {tasks})



}


//Delete all tasks from the database
exports.deleteTasks = async (req, res) => {
  res.render("delete.pug");
  const tasks = await cardModel.deleteMany();
  console.log("Tasks Deleted");
}


exports.updateTask = function (req, res) {

    let task = new cardModel(
        {
            title: req.body.title,
            description: req.body.description
        });

   console.log(req.body);
    console.log(req.params.id);
    console.log(req.params);
   task.findOneAndUpdate(req.params.id, {$set: req.body}, function (err, task) {

    if (err) return next(err);
   // res.send('Product updated.');
    res.redirect("/");

});
};
exports.updateTaskPage = function (req, res){
    res.render('update');
}

exports.createTaskPage = function (req, res){
    res.render('create');
}
