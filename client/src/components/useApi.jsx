import React,{useState,useEffect} from 'react'
import axios from 'axios'

const useApi = (endpoint) => {
    const [data,setData] = useState([])

    useEffect(()=>{
        getData()
    },[])

    const getData = async ()=>{
       const response = await axios.get(endpoint)
       setData(response.data)
    }

  return data
}

export default useApi