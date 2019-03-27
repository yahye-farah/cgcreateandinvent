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

//get all completed todos

router.get('/complete/:user', (req, res) => {
    console.log(req.params.user)
    Todos.find({userId: req.params.user, completed: true}).then(result => {
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

router.post(`/delete/:id`, (req, res) => {
    Todos.findByIdAndDelete({_id: req.params.id}).then(result => {
        res.send('Deleted');
    })
    .catch(err => {
        console.log(err);
    })
})

//complete Todo

router.post('/completed/:id', (req, res) => {
    console.log('pppp')
    Todos.findById({_id: req.params.id}).then(result => {
        result.completed = true
        result.save()
        res.send('completed')
    })
    .catch(err => {
        console.log(err);
    })
})



module.exports = router