const TodoList = require('../models/TodoList')

module.exports = async(req,res)=>{
    
    await TodoList.create(req.body)

    res.json('data posted')
}