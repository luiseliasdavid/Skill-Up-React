import React,{useEffect} from 'react'
import {createUser , userList , login , logout} from "../actions"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const  Estado= ()=> {
const API_SWAGGER= 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com'

let data = useSelector(state=> state)
const dispatch = useDispatch()

useEffect(()=>{
//console.log(data)
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
const log=()=>{
 dispatch(login({
  "email": "pepe@pepe.com",
  "password": "123456"
}))
}

  return (
    <div>
      <button onClick={crearUsuario}>cear usuario </button>
      <button onClick={log}>login</button>
      
      <button></button>
    </div>
  )
}
