import React, { useState } from 'react'
import axios from 'axios'

const RegisterUser = () => {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const registerUser = async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:3000/api/register',[{
                name,
                email,
                password
        }])
        console.log('form submitted')
        setName('')
        setEmail('')
        setPassword('')
    }
    
  return (
    
    <div>
        <form  method="post" onSubmit={registerUser}>
        <input type="text" value={name} placeholder='Name' onChange={(e)=>setName(e.target.value)} />
        <br />
        <input type="email" value={email} placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
        <br />
        <input type="password" value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        <br />
        <input type="submit" value="submit" />
        </form>
    </div>
   
  )
}

export default RegisterUser