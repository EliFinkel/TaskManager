const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController.js');



router.get('/add', cardController.homePage);
router.post('/add', cardController.createCard);
router.get('/', cardController.getTasks);
router.get('/delete', cardController.deleteTasks)
router.delete('/delete', cardController.deleteTasks)


module.exports = router;