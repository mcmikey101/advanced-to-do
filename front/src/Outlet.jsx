import SignIn from "./signin"
import HomePage from './HomePage.jsx'

function Outlet(props) {
    if (props.page == 'signin') {
        return <SignIn loggedin={props.loggedin} setloggedin={props.setloggedin} lastlogin={props.lastlogin} setlastlogin={props.setlastlogin}/>
    }
    else if (props.page == 'home') {
        return <HomePage login={props.lastlogin}/>
    }
} 

export default Outlet