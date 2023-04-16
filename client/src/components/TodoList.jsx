import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { todoContext } from '../App'
import useApi from './useApi'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import {BiEdit} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {TiCancelOutline} from 'react-icons/ti'

const TodoList = () => {
    const {state,dispatch} = useContext(todoContext)
    const [todoText,setTodoText] = useState('')
    // const [todoStatus,setTodoStatus] = useState('pending')
    const [editMode,setEditMode]= useState(false)
    const [editTodo,setEditTodo] = useState(null)
    const buttonTitle = editMode ? (<div className='flex gap-1'><BiEdit size={35}/> 
    <TiCancelOutline onClick={()=>{
        setTodoText('')
        setEditMode(false)
        setEditTodo(null)}} size={38}/></div>) : <AiOutlinePlusSquare size={40}/>

    const endpoint = 'http://localhost:3000/todos'
    const savedTodos = useApi(endpoint)
   
    useEffect(()=>{
        dispatch({type:'get',payload: savedTodos})
    },[savedTodos])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log('submitted')
        if (!todoText.trim()) {
          return;
        }
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
        <h1 className='font-bold text-4xl text-slate-700 text-center'>Mern Todo App</h1>

        <form className='flex gap-2 justify-center items-center mt-3' onSubmit={handleSubmit}>
            <input className='bg-white  border-b-orange-400 border-b-4 text-black rounded-md py-1 px-2 focus:border-orange-500' type="text" value={todoText} name="todos" placeholder='Enter Your Task Here' onChange={(e)=>setTodoText(e.target.value)}  />
            <button className='text-slate-700' type="submit">{buttonTitle}</button>
        </form>

        <div>
        <ul className='flex flex-col justify-center items-center mt-2'>
            {state.todoList.map((item)=>{
                return <li className='flex flex-row justify-between text-white bg-slate-700 w-4/12 m-2 p-2 rounded-lg font-medium ' key={item.id}>
                        
                            <p className='font-semibold my-auto'>{item.todos}</p>

                        <div className='flex gap-2'>
                                <button className=' py-1  rounded-md' 
                                onClick={()=>{
                                setTodoText(item.todos)
                                setEditMode(true)
                                setEditTodo(item)
                                }}> 
                            <BiEdit size={20}/>
                            </button>
                            
                            <button className='py-1  rounded-md'
                                onClick={async()=>{
                                await axios.delete(`${endpoint}/delete/${item.id}`)
                                dispatch({type:'delete',payload:{id: item.id}})
                                }}>
                                <MdDeleteOutline size={20}/>
                            </button>
                        </div>
                        
                    </li>
            })}
           
            
        </ul>
        </div>    

    </div>
  )
}

export default TodoList