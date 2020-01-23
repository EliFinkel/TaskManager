const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController.js');



router.get('/add', cardController.createTaskPage)
router.post('/add', cardController.createTask);
router.get('/', cardController.getTasks);
router.post('/:id/delete', cardController.deleteTasks);
router.get('/:id/delete', cardController.deleteTasks);
router.post('/:id/update', cardController.updateTask);
router.get('/:id', cardController.getOneTask);


module.exports = router;