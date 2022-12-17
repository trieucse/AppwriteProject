import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ForgotPass from '../components/ForgotPass'
import Login from '../components/Login'
import Register from '../components/Signup'
import ResetPass from '../components/ResetPass'
import Home from '../components/Home'
function RouteComponent() {
  return (
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Register/>}></Route>
        <Route path="/forgot" element={<ForgotPass/>}></Route>
        <Route path="/reset" element={<ResetPass/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
    </Routes>
  )
}

export default RouteComponent