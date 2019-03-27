const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const keys = require('./keys')
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
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


const todoRoute = require('./backend/routes/todoRoute');
const authRoute = require('./backend/routes/authRoute');

app.use('/todo', todoRoute);
app.use('/auth', authRoute);


app.listen(port, () => {
    console.log(`Server is successfuly running on port ${port}`)
})