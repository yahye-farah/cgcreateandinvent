const express = require('express');
const router = express.Router();
const Todos = require('../model/Todo');
const authCheck = require('../authCheck');
const jwt = require('jsonwebtoken');
const keys = require('../../keys')

//create Todo
router.post('/create', authCheck, (req, res) => {
    jwt.verify(req.token, keys.secret, function (err, decoded) {
        console.log('kkkk', decoded)
        if (req.body.userId !== decoded.userName) {
            return res.send({
                message: "Unauthorized"
            })
        }
        const todo = new Todos({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId,
            dateandtime: req.body.dateandtime
        })
        todo.save().then(result => {
            console.log('successfuly saved');
            res.send('Saved');
        })
            .catch(err => {
                console.log(err);
            })
    });

})

//get all active Todos from the database

router.get('/active/:user', authCheck, (req, res) => {
    jwt.verify(req.token, keys.secret, (err, decoded) => {
        if(!decoded){
           return  res.send("authfailed")
        }
        Todos.find({ userId: req.params.user, completed: false }).then(result => {
            res.send(result)
        })
            .catch(error => {
                console.log(error);
            })
    })
   
})

//get all completed todos

router.get('/complete/:user', authCheck , (req, res) => {

    jwt.verify(req.token, keys.secret , (err, decoded) => {
        if(!decoded) {
            return res.send('authfailed')
        }
        
    Todos.find({ userId: req.params.user, completed: true }).then(result => {
        res.send(result)
    })
        .catch(error => {
            console.log(error);
        })
    })

})

//update specific Todo 

router.post('/updateTodo', (req, res) => {

    jwt.verify(req.token, keys.secret , (err, decoded) => {
        if(!decoded) {
            return res.send('authfailed')
        }
        Todos.find({ _id: req.body.id }).then(result => {
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
    

})

//delete specific Todo 

router.post(`/delete`, authCheck, (req, res) => {
    console.log('kkkk')
    jwt.verify(req.token, keys.secret , (err, decoded) => {
        if(!decoded) {
            return res.send('authfailed')
        }
        Todos.findByIdAndDelete({ _id: req.body.id }).then(result => {
            res.send('Deleted');
        })
            .catch(err => {
                console.log(err);
            })
    })


})

//complete Todo

router.get('/completed/:id',authCheck ,(req, res) => {
    jwt.verify(req.token, keys.secret , (err, decoded) => {
        if(!decoded) {
            return res.send('authfailed')
        }
        Todos.findById({ _id: req.params.id }).then(result => {
            result.completed = true
            result.save()
            res.send('completed')
        })
            .catch(err => {
                console.log(err);
            })
    })
})



module.exports = router