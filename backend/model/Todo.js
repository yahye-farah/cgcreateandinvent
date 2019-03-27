const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        default: false
    },
    userId: {
        type: String,
    },
    dateandtime: {
        //optional
        type: String,
        required: false
    }
})

module.exports = mongoose.model('todo', TodoSchema);