import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import AuthContext, { AuthData } from './context/AuthContext'

const App=()=> {

const [user, setUser] = useState(null)
const [loggedInUser, setloggedInUser] = useState(null)
const [userData,setUserData] = useContext(AuthData)

useEffect(()=>{

const loggedInUser = localStorage.getItem('loggedInUser')
if(loggedInUser){
  const userData = JSON.parse(loggedInUser)
  setUser(userData.role)
  setloggedInUser(userData.data)
}

},[])


const handelLogin = (email,password)=>{
  if(email=="admin@123gmail.com" && password == 123){
      setUser('admin')
      localStorage.setItem('loggedInUser',JSON.stringify({role:'admin'}))
  }
  else if(userData){
    const employee = userData.find((e)=>email == e.email && e.password === password)
    if(employee){
      setUser('employee')
      setloggedInUser(employee)
      localStorage.setItem('loggedInUser',JSON.stringify({role:'employee',data:employee}))
    }

  }
  else{
      alert("Invalid Credentials")
  }
}

  
  return (
    <>
    {!user ? <Login handelLogin = {handelLogin}/> : ''}
    {user == 'admin' ? <AdminDashboard changeUser={setUser} /> :  (user == "employee" ? <EmployeeDashboard changeUser={setUser} data = {loggedInUser}/>:null) }
    </>
  )
}

export default App