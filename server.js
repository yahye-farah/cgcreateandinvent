const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./keys')
const app = express();
const mongoose = require('mongoose')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const port = 4000;

//mongodb connection
mongoose.connect(keys.dbUrl);
const db = mongoose.connection;

db.on('open', () => {
    console.log("Mongo db connected successfuly");
});

db.on('error', () => {
    console.log('Mongo db connection failed');
})


const todoRoute = require('./backend/routes/todoRoute')


app.listen(port, () => {
    console.log(`Server is successfuly running on port ${port}`)
})