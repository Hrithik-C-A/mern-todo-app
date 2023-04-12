import React, { useContext ,useReducer } from 'react'
import TodoList from './components/TodoList'

const todoInitialState = {
  todoList: []
}

export const todoContext = React.createContext()

const App = () => {
  const [state,dispatch] = useReducer(todoReducer,todoInitialState)

  return (
    <div>

    <todoContext.Provider value={{state,dispatch}}>
        <TodoList/>
    </todoContext.Provider>

    </div>
  )
}

const todoReducer = (state,action)=>{
  switch (action.type){
    case 'get' : 
      return {...state, todoList: action.payload}

    case 'add' :
      const addedTodoState = [...state.todoList,action.payload]
      return {...state,todoList:addedTodoState}

    case 'edit':  
     const updatedTodo = {...action.payload} 
     const updatedTodoIndex = state.todoList.findIndex(t => t.id === action.payload.id) 
     const updatedTodos = [ ...state.todoList.slice(0,updatedTodoIndex),
      { ...updatedTodo, todos: action.payload.todos },
       ...state.todoList.slice(updatedTodoIndex + 1) ]; 
     return {...state, todoList: updatedTodos}


    case 'delete':
      const filteredTodoState = state.todoList.filter(todo=> todo.id !== action.payload.id)
      return {...state,todoList: filteredTodoState}

    default:
      return todoInitialState
  }
}

export default App