import React, { useState } from 'react'
import './App.css'
import NavBar from './NavBar'
import Outlet from './Outlet'

function App() {
  const [page, setPage] = useState('home')
  const [loggedin, setLoggedin] = useState(false)
  const [lastlogin, setLastLogin] = useState('')
  return (
    <>
      <NavBar setPage={setPage} login={lastlogin}/>
      <Outlet page={page} setloggedin={setLoggedin} loggedin={loggedin} lastlogin={lastlogin} setlastlogin={setLastLogin}/>
    </>
  )
}

export default App
