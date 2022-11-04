import React,{useEffect} from 'react'
import {createUser , userList , login ,logout, createAccount } from "../actions"
import { useDispatch, useSelector } from 'react-redux';


export const  Estado= ()=> {
const API_SWAGGER= 'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com'

let data = useSelector(state=> state)
const dispatch = useDispatch()

useEffect(()=>{
 if(data){
 console.log(data)}
//result 11-3-2022   // necesitamos esto -> "2022-10-26 10:00:00"
},[data])

const crearUsuario= ()=>{
  console.log("hoola")
 dispatch( createUser({
    
    first_name: "liodfpsp",
    last_name: "oposfpojhndredss",
    email: "aaassaqq@ail.com",
    password: "123456",
    points: 0,
    roleId: 2,
    
  }))
}
const log=()=>{
 dispatch(login({
  email: "aaassaqq@ail.com",
  password: "123456"
}))
}

const userLogout = () => {
  dispatch(logout());
}
const consoleEstate = ()=>{
  console.log(data)
  console.log(JSON.parse(localStorage.getItem("user")))
  if(data.userdata){
  console.log(JSON.parse(localStorage.getItem("user")).id)}
}

const crearCuenta =()=> {
  dispatch(createAccount(67))
}
  return (
    <div>
      <button onClick={consoleEstate}>Console.log estado</button>
      <button onClick={crearUsuario}>cear usuario </button>
      <button onClick={log}>login</button>
      <button onClick={userLogout}>LOGOUT</button>
      <button onClick={crearCuenta}>crear account</button>
      
    </div>
  )
}

