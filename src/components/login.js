import React from "react"
import io from "socket.io-client"

import "./../css/login.css"


import * as Bootstrap from 'react-bootstrap';
import Cookies from 'js-cookie';
import Input from "./objects/input"
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            message: "",

        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit() {
        this.state.message = ""
        let socket = io("localhost:80")
        socket.emit("login", { username: this.state.username, password: this.state.password })
        socket.on("message", data => {
            this.setState({ message: data.message })
            console.log(data)
            if (data.token) {
                Cookies.set("userData", data.token);
                console.log("logged In!")
            }


        })
    }
    render() {
        return <React.Fragment> <form className="container login">
            <Input name="username" display="username" onChange={(e) => this.handleChange(e)} required></Input><br />
            <Input name="password" type="password" display="password" onChange={(e) => this.handleChange(e)} required></Input><br />

            <h3 key="messenger">{this.state.message}</h3>
            <button onClick={(e) => this.submit(e)} className='btn btn-primary'>Login</button>
            <Bootstrap.NavLink href="/register">you don't have an account?</Bootstrap.NavLink>
        </form>

        </React.Fragment>
    }
}
class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            disabled: false
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
        this.state.message = ""
        let socket = io("localhost:80")
        if (this.state.username.length < 8) {
            this.setState({ message: "the length of the username is less then 8" })
            return
        }
        if (this.state.verifyPassword !== this.state.password) {
            this.setState({ message: "password is not verified" })
            return
        }
        if (this.state.password.length < 8) {
            this.setState({ message: "the length of the password is less then 8" })
            return
        }
        socket.emit("register", { username: this.state.username, password: this.state.password, pfp: this.state.pfp })

        socket.on("message", ({ message, status }) => {
            if (status === 200) {
                this.setState({ message, disabled: true })
                // redirect

            } else {

                this.setState({ message })
            }
        })
    }
    render() {

        return <div className="container login">
            <Input name="pfp" display="button to pfp" onChange={(e) => this.handleChange(e)}></Input><br />
            <Input name="username" display="username" onChange={(e) => this.handleChange(e)}></Input><br />
            <Input type="password" name="password" display="password" onChange={(e) => this.handleChange(e)}></Input><br />
            <Input type="password" name="verifyPassword" display="verify Password" onChange={(e) => this.handleChange(e)}></Input><br />

            <h3>{this.state.message}</h3>
            <button onClick={(e) => this.submit(e)} className='btn btn-primary' disabled={this.state.disabled}>Register</button>
            <Bootstrap.NavLink href="/login">do you already have an account?</Bootstrap.NavLink>
        </div >
    }
}


class Logout extends React.Component {

    logOut() {
        Cookies.set("userData", "")
    }
    render() {
        return (<React.Fragment>
            <a>DO you wish to loadout?</a>
            <button onClick={() => this.logOut()} herf="/login">yes</button>

        </React.Fragment>)
    }
}
export { Login, Register, Logout }