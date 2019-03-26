const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const keys = require('../../keys');

//signup fro new users
router.post('/newUser', (req, res) => {

    User.find({userName: req.body.userName}).then(user => {
        if(user){
            res.send("This userName is taken please choose another one");
        }

        const user = new User({
            firstName: req.body.firstName,
            LastName: req.body.LastName,
            UserName: req.body.UserName,
            password: req.body.password
        })
        user.save().then(user => {
            console.log('saved');
            //send token here
            const token = jwt.sign({userName: user.userName}, keys.secret, {expiresIn: '1h'})
            res.send('saved')
        })
        .catch(err => {
            console.log(err);
        })
    })   
})

// login users 

router.post('/login', (req, res) => {
    User.find({userName: req.body.userName})
    .then(user => {
        if(!user) {
            res.send("Your username is wrong please try again")
        }
        //check the password

    })
})


module.exports = router;