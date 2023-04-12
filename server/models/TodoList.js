const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TodoListSchema = new Schema({
    id: String,
    todos: String,
    datePosted:{
        type: Date,
        default: new Date
    }
})

const TodoList = mongoose.model('TodoList',TodoListSchema)
module.exports = TodoList