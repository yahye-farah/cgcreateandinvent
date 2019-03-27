const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const keys = require('../../keys');
const bcrypt = require('bcrypt');

//signup fro new users
router.post('/signup', (req, res) => {
    User.find({ userName: req.body.userName }).then(user => {
        if (user.length !== 0) {
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
                let token = jwt.sign({ userName: user.userName }, keys.secret, { expiresIn: '1h' })
                res.send({
                    token: token,
                    userName: req.body.userName
                });
            })
                .catch(err => {
                    console.log(err);
                })
        })
    })
})


// signin users 
router.post('/signin', (req, res) => {
    console.log(req.body.password)
    console.log(req.body.userName)
    User.findOne({ userName: req.body.userName }).then(user => {
            console.log('user',user)
            if (!user) {
                return res.send("Incorrect Username")
            }
            // //check the password
            // console.log('jjj')
            var bol = bcrypt.compare(req.body.password, user.password)
            console.log('boolean',bol);
            return bol
    })
    .then(result => {
        console.log('result',result)
        if (!result) {
           return  res.send("Incorrect Password")
        }

        let token = jwt.sign({ userName: req.body.userName }, keys.secret, { expiresIn: '1h' })
        res.send({token: token, userName: req.body.userName});
    })
})


module.exports = router;