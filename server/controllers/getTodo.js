const TodoList = require('../models/TodoList')

module.exports = async(req,res)=>{
    const todoList = await TodoList.find({})

    res.json(todoList)
}