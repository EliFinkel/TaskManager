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
//router.get('/:id', cardController.getOneTask);
router.get('/login', cardController.getLoginPage);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });




module.exports = router;