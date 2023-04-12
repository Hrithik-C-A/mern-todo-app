const TodoList = require('../models/TodoList')

module.exports = async(req,res)=>{

const toUpdate = {
    id: req.body.id,
    todos: req.body.todos,
    status: req.body.status
}

   await TodoList.findOneAndUpdate({id: req.params.id},toUpdate)

//    const result =await TodoList.find({id: req.params.id})

    res.json('data updated')
}