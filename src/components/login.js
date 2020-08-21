import React from "react"


import io from "socket.io-client"

import "./../css/login.css"


import * as Bootstrap from 'react-bootstrap';
import Cookies from 'js-cookie';
import Input from "./objects/input";

const language = {
    register: "register",
    the_username_is_too_short: "the username is too short",
    the_password_is_too_short: "the password is too short",


    password_is_not_confirmed: "password is not confirmed",

}



const defaultRegisterData = { username: "", password: "", pfp: "", verifyPassword: '' }


function handleChange(e, oldV, f) {
    let newV = oldV;
    newV[e.target.name] = e.target.value
    f(newV)
}

const serverUrl = "localhost:80"


/**this function for submiting login to server
 * @prop {options} -setMessage, loginData{username, password}
 */
function submitLogin(options) {
    const { setMessage, loginData } = options

    let socket = io(serverUrl)
    socket.emit("login", loginData)
    socket.on("message", ({ message, token }) => {
        setMessage(message)
        if (token) {
            Cookies.set("userData", { message, token });
            console.log("loggedin")
        }
    })
}

/**this function for submiting register to server
 * @prop {options} -username, password, verifyPassword, setMessage, pfp, setdisabledRegister
 */
function submitRegister(setMessage, options) {

    const { registerData, setRedirected } = options
    const { username, password, pfp, verifyPassword } = registerData
    let socket = io(serverUrl)
    if (username.length < 8) {
        setMessage(language.the_username_is_too_short)
        return
    }
    if (verifyPassword != password) {
        setMessage(language.password_is_not_confirmed)
        return
    }
    if (password.length < 8) {
        setMessage(language.the_password_is_too_short)
        return
    }

    socket.emit("register", { username, password, pfp })

    socket.on("message", ({ message, status }) => {
        if (status === 200) {
            setMessage(message)
            // redirect to main


        } else {
            setMessage(message)
        }
    })
    socket.disconnect();
}


function Login(props) {
    let [loginData, setLoginData] = React.useState({ username: "", password: "" })
    let [message, setMessage] = React.useState("")

    return <React.Fragment> <form className=" login">
        <h3 className="text-center">Login</h3>
        <Input name="username" display="username" onChange={(e) => handleChange(e, loginData, setLoginData)} required></Input><br />
        <Input name="password" type="password" display="password" onChange={(e) => handleChange(e, loginData, setLoginData)} required></Input><br />

        <h3 key="messenger">{message}</h3>
        <button onClick={() => submitLogin({ setMessage, loginData })} className='btn btn-primary'>Login</button>
        <Bootstrap.NavLink href="/register">I don't have an account.</Bootstrap.NavLink>
    </form>

    </React.Fragment>
}


function Register(props) {
    // setting states
    let [registerData, setRegisterData] = React.useState(defaultRegisterData)

    let [message, setMessage] = React.useState("")
    let [redirected, setRedirected] = React.useState(false)

    if (redirected == false) {
        return <div className=" login ">
            <h3 className="text-center">Register</h3>
            <Input name="pfp" display="link to pfp" onChange={(e) => handleChange(e, registerData, setRegisterData)}></Input><br />
            <Input name="username" display="username*" onChange={(e) => handleChange(e, registerData, setRegisterData)} required></Input><br />
            <Input type="password" name="password" display="password*" onChange={(e) => handleChange(e, registerData, setRegisterData)} required></Input><br />
            <Input type="password" name="verifyPassword" display="Confirm Password*" onChange={(e) => handleChange(e, registerData, setRegisterData)} required></Input><br />

            <h3>{message}</h3>
            <button onClick={() => submitRegister(setMessage, { registerData, setRedirected })} className='btn btn-primary' >Register</button>
            <Bootstrap.NavLink href="/login">i already have an account.</Bootstrap.NavLink>
        </div >
    } else {
        return <React.Link to="/">home</React.Link>
    }
}



function logOut() {
    Cookies.set("userData", "")
}

function Logout(props) {
    return (<React.Fragment>
        <a>DO you wish to loadout?</a>
        <button onClick={() => logOut()} herf="/login">yes</button>

    </React.Fragment>)
}

export { Login, Register, Logout }