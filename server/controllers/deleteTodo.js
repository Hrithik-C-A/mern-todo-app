const TodoList = require('../models/TodoList')

module.exports = async(req,res)=>{

    try {
        await TodoList.findOneAndDelete({id: req.params.id})
        console.log('deleted')
    } catch (error) {
        console.log(error)
    }

    res.json('deleted')
}