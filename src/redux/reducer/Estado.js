import React,{useEffect} from 'react'
import {createUser , userList , login ,logout } from "../actions"
import { useDispatch, useSelector } from 'react-redux';


export const  Estado= ()=> {
const API_SWAGGER= 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com'

let data = useSelector(state=> state)
const dispatch = useDispatch()

useEffect(()=>{

/* var today = new Date();
// obtener la fecha de hoy en formato `MM/DD/YYYY`
var now = today.toLocaleDateString('en-US');
console.log(now.replaceAll("/","-").split("-"));
const arr = now.replaceAll("/","-").split("-");

let date = [ arr[2], arr[0], arr[1]].join('-'); */
var today = new Date();
var now = today.toLocaleDateString('en-US');
console.log(now);

//result 11-3-2022   // necesitamos esto -> "2022-10-26 10:00:00"
},[data])

const crearUsuario= ()=>{
  console.log("hoola")
 dispatch( createUser({
    
    first_name: "lio",
    last_name: "asdfndredss",
    email: "bbbbbbsdffd00@gmail.com",
    password: "123456",
    points: 0,
    roleId: 2,
    
  }))
}
const log=()=>{
 dispatch(login({
  email: "bbbbbbfd00@gmail.com",
  password: "123456"
}))
}

const userLogout = () => {
  dispatch(logout());
}

  return (
    <div>
      <button onClick={crearUsuario}>cear usuario </button>
      <button onClick={log}>login</button>
      <button onClick={userLogout}>LOGOUT</button>
      
      <button></button>
    </div>
  )
}
