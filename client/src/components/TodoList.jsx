import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { todoContext } from '../App'
import {Table} from 'react-bootstrap'
import useApi from './useApi'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

const TodoList = () => {
    const {state,dispatch} = useContext(todoContext)
    const [todoText,setTodoText] = useState('')
    // const [todoStatus,setTodoStatus] = useState('pending')
    const [editMode,setEditMode]= useState(false)
    const [editTodo,setEditTodo] = useState(null)
    const buttonTitle = editMode ? 'Edit' : 'Add'

    const endpoint = 'http://localhost:3000/todos'
    const savedTodos = useApi(endpoint)
   
    useEffect(()=>{
        dispatch({type:'get',payload: savedTodos})
    },[savedTodos])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log('submitted')
        if(editMode){
            await axios.patch(`${endpoint}/update/${editTodo.id}`,{todos: todoText})
            dispatch({type:'edit',payload:{...editTodo,todos: todoText}})
            setEditMode(false)
            setEditTodo(null)
        }
        else{
            const newTodo = {id: uuidv4(),todos: todoText}
            await axios.post(`${endpoint}/post`,[newTodo])
            console.log(newTodo)
            dispatch({type:'add',payload:newTodo})
        }
        setTodoText('')

    }
  return (
    <div>
        <form style={{textAlign:'center',marginTop:'1rem'}} onSubmit={handleSubmit}>
            <input type="text" name="todos" placeholder='Enter Tasks Here' onChange={(e)=>setTodoText(e.target.value)}  />
            <button style={{marginLeft:'1rem'}} type="submit">{buttonTitle}</button>
        </form>

            {/* <h1>{todoText}</h1> */}

        <Table striped bordered hover style={{marginTop:'1rem'}}>
        <thead> 
            <tr> 
                <th>To Do</th>
                <th>Edit</th> 
                <th>Delete</th> 
            </tr> 
        </thead>
        <tbody>
            {state.todoList.map((item)=>{
                return <tr key={item.id}>
                    <td>{item.todos}</td>
                    <td><button onClick={()=>{
                        setTodoText(item.todos)
                        setEditMode(true)
                        setEditTodo(item)
                    }}>Edit</button></td>
                    <td><button onClick={async()=>{
                        await axios.delete(`${endpoint}/delete/${item.id}`)
                        dispatch({type:'delete',payload:{id: item.id}})}}>Delete</button></td>
                </tr>
            })}
        </tbody>
       </Table> 
    </div>
  )
}

export default TodoList