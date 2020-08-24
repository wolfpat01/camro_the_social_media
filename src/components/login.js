import React from "react"


import io from "socket.io-client"

import "./../css/login.css"

import { submitLogin, submitRegister } from "./helpers/serverHandler"

import * as Bootstrap from 'react-bootstrap';
import Cookies from 'js-cookie';
import Input from "./style/input";





const defaultRegisterData = { username: "", password: "", pfp: "", verifyPassword: '' }


function handleChange(e, oldV, f) {
    let newV = oldV;
    newV[e.target.name] = e.target.value
    f(newV)
}

const serverUrl = "localhost:80"



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