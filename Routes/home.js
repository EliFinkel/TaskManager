const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController.js');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;



router.get('/add', cardController.createTaskPage)
router.post('/add', cardController.createTask);
router.get('/', cardController.getTasks);
router.post('/:id/delete', cardController.deleteTasks);
router.get('/:id/delete', cardController.deleteTasks);
router.post('/:id/update', cardController.updateTask);
//TODO fix error
router.get('/:id', cardController.getOneTask);
router.get('/login', cardController.getLoginPage);





module.exports = router;