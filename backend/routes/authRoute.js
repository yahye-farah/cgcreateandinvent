const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const keys = require('../../keys');
const bcrypt = require('bcrypt');

//signup fro new users
router.post('/newUser', (req, res) => {

    User.find({userName: req.body.userName}).then(user => {
        if(user){
            res.send("This userName is taken please choose another one");
        }

        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new User({
                firstName: req.body.firstName,
                LastName: req.body.LastName,
                UserName: req.body.UserName,
                password: hash
            })
            user.save().then(user => {
                console.log('saved');
                let token = jwt.sign({userName: user.userName}, keys.secret, {expiresIn: '1h'})
                res.send(token);
            })
            .catch(err => {
                console.log(err);
            })
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