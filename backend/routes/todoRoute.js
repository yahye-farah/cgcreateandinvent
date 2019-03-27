const express = require('express');
const router = express.Router();
const Todos = require('../model/Todo');

//create Todo
router.post('/create', (req, res) => {
    const todo = new Todos({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
    })
    todo.save().then(result => {
        console.log('successfuly saved');
        res.send('Saved');
    })
    .catch(err => {
        console.log(err);
    })
})

//get all active Todos from the database

router.get('/active/:user', (req, res) => {
    console.log(req.params.user)
    Todos.find({userId: req.params.user, completed: false}).then(result => {
        res.send(result)
    })
    .catch(error => {
        console.log(error);
    })
})

//update specific Todo 

router.post('/updateTodo', (req, res) => {
    Todos.find({_id: req.body.id}).then(result => {
        result.title = req.body.title;
        result.description = req.body.description;

        result.save().then(result => {
            res.send('saved');
        })
    })
    .catch(err => {
        console.log(err);
    })
})

//delete specific Todo 

router.post('/delete', (req, res) => {
    Todos.findByIdAndDelete({_id: req.body.id}).then(result => {
        res.send('Deleted');
    })
    .catch(err => {
        console.log(err);
    })
})

//get completed Todo from the database

router.get('/completed', (req, res) => {
    Todos.findById({_id: req.body.id}).then(result => {
        result.completed = true
        result.save()
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router