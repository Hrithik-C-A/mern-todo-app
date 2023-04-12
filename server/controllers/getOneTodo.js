const TodoList = require('../models/TodoList')

module.exports = async(req,res)=>{
    const todoList = await TodoList.find({id: req.params.id})

    res.json(todoList)
}