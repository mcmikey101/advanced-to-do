import { useState, useEffect } from 'react'
import './App.css'
function SignForm(props) {
  if (props.loggedin == true) {
    return (
      <>
      <button onClick={props.signout}>Sign Out</button>
      </>
    )
  }
  return (
    <>
      <input maxLength={25} id='loginInput' type='text' onChange={(e) => props.updateLoginValue(e)} placeholder='Login'/>
      <input maxLength={25} id='passwordInput' type='password' onChange={(e) => props.updatePasswordValue(e)} placeholder='Password'/>
      <button onClick={props.signin}>Sign In</button>
      <button onClick={() => props.register()}>Register</button>
    </>
  )
}
function SignIn(props) {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [logmsg, setLogMsg] = useState('')
  useEffect(() => {
    if (props.loggedin) {
      setLogMsg(props.lastlogin + ' logged in!')
    }
  })
  
  async function putData() {
    const req = await fetch('http://localhost:3000', {
      method: 'POST',
      body: JSON.stringify({login: login, password: password, type: 'reg'}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await req.json()
    setLogMsg(data.msg)
  }
  async function checkDB() {
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      body: JSON.stringify({login: login, password: password, type: 'signin'}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.msg === 'true') {
      return true
    } 
    else {
      return false
    }
  }

  function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    event.simulated = true;
    let tracker = element._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }

  const logInput = document.getElementById("loginInput");
  const pwInput = document.getElementById("passwordInput");

  function register() {
    if (login != "" && password != "") {
      putData()
      setNativeValue(logInput, "")
      setNativeValue(pwInput, "")
      setLogMsg("")
    } else {
      setLogMsg("Enter both login and password")
    }
  }
  async function signin() {
    if (login != "" && password != "") {
      const check = await checkDB()
      if (check) {
        props.setlastlogin(login)
        setLogMsg(login + "logged in!")
        setNativeValue(logInput, "")
        setNativeValue(pwInput, "")
        props.setloggedin(true)
      } 
      else if (!check) {
        setLogMsg("Invalid credentials")
      }
    } else {
      setLogMsg("Enter both login and password")
    }
  }
  function signout() {
    props.setloggedin(false)
    props.setlastlogin('')
    setLogMsg("")
  }
  function updateLoginValue(e) {
    let val = e.target.value
    setLogin(val)
  }
  function updatePasswordValue(e) {
    let val = e.target.value
    setPassword(val)
  }
    return (
        <>
        <div className="main">
            <div className='formContainer'>
            <div className='form'>
                <SignForm signout={signout} signin={signin} loggedin={props.loggedin} updateLoginValue={updateLoginValue} updatePasswordValue={updatePasswordValue} register={register}/>
                <span className='logmsg'>{logmsg}</span>
            </div>
            </div>
        </div>
        </>
    )
}

export default SignIn