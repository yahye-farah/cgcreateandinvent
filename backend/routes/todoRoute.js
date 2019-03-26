const express = require('express');
const router = express.Router();
const Todos = require('../model/Todo');

//create Todo
router.post('/createTodo', (req, res) => {

})

//get all active Todos from the database

router.get('/activeTodo', (req, res) => {
    
})

//update specific Todo 

router.post('/updateTodo', (req, res) => {

})

//delete specific Todo 

route.post('/delete', (req, res) => {

})

//get completed Todo from the database

route.get('/completed', (req, res) => {

})

module.exports = router