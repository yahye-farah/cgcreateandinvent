const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const keys = require('../../keys');
const bcrypt = require('bcrypt');

//signup fro new users
router.post('/signup', (req, res) => {
    User.find({userName: req.body.userName}).then(user => {
        if(user.length !== 0){
           return res.send("This userName is taken please choose another one");
        }
        console.log('check')
        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: hash
            })
            user.save().then(user => {
                let token = jwt.sign({userName: user.userName}, keys.secret, {expiresIn: '1h'})
                res.send(token);
            })
            .catch(err => {
                console.log(err);
            })
        })
    })   
})


// signin users 
router.post('/signin', (req, res) => {
    User.find({userName: req.body.userName})
    .then(user => {
        if(!user) {
            res.send("Your username is wrong please try again")
        }
        //check the password
        return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
        if(!result) {
            res.send("Your Password is Wrong")
        }

        let token = jwt.sign({userName: user.userName}, keys.secret, {expiresIn: '1h'})
        res.send(token);
    })
})


module.exports = router;