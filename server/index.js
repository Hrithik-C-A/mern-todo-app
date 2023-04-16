const express = require('express')
const app = express()
const { urlencoded } = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


const postTodoController = require('./controllers/postTodo')
const getTodoController = require('./controllers/getTodo')
const getOneTodoController = require('./controllers/getOneTodo')
const updateTodoController = require('./controllers/updateTodo')
const deleteTodoController = require('./controllers/deleteTodo')

try {
    mongoose.connect('mongodb+srv://hrithikca:practice@cluster0.qeheprw.mongodb.net/test',{useNewUrlParser: true,useUnifiedTopology: true})
    console.log('Connected to DB')

} catch (error) {
    console.log(error)
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/todos',getTodoController)
app.get('/todos/one/:id',getOneTodoController)
app.post('/todos/post', postTodoController)
app.patch('/todos/update/:id',updateTodoController)
app.delete('/todos/delete/:id',deleteTodoController)

app.listen(3000,()=>{
    console.log('App is running.')
})