const cardModel = require('../models/card.js');

//Simple version, without validation or sanitation



exports.homePage = function (req, res) {
    
}





exports.createCard = function (req, res) {
    let card = new cardModel(
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

    card.save(function (err) {
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



exports.updateTask =  async (req, res) => { 
    const tasks = await cardModel.findOneAndUpdate();
    console.log(`Updated ${tasks}`);
    res.redirect('/');

}




