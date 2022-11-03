import React,{useEffect} from 'react'
import {createUser , userList , login , logout} from "../actions"
import { useDispatch, useSelector } from 'react-redux';


export const  Estado= ()=> {

let data = useSelector(state=> state)
const dispatch = useDispatch()

useEffect(()=>{
console.log(data)
},[data])

const crearUsuario= ()=>{
  console.log("hoola")
 dispatch( createUser({
    
    "first_name": "lionel",
    "last_name": "andres",
    "email": "lio10@gmail.com",
    "password": "123456",
    "points": 0,
    "roleId": 2,
    
  }))
}
const listaDeUsuarios=()=>{
  
}
console.log(data)
  return (
    <div>
      <button onClick={crearUsuario}>cear usuario </button>
      <button onclick={listaDeUsuarios}></button>
      <button></button>
      <button></button>
    </div>
  )
}
