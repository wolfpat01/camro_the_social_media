import React from 'react';

import './css/App.css';
import * as Bootstrap from "react-bootstrap"
import MenuBar from "./components/nav-Bar";
import { Register, Login, Logout } from "./components/login.js"
import Cookie from "js-cookie"
let token = Cookie.get("userData")
let DarkTheme = true


function getOne(mod) {
    let render = <Login />
    if (Cookie.get("userData") !== (undefined || "")) {
        return <Logout />
    }
    if (mod === "register") {
        render = <Register onRegisterd={() => onRegisterd()} />;
    }
    return render
}
function onRegisterd() {

}
function App(props) {

    return (
        <React.Fragment>

            <MenuBar token={token} darkTheme={DarkTheme} />
            <Bootstrap.Container>

                {getOne(props.mod)}

            </Bootstrap.Container>
        </React.Fragment>
    );
}

export default App;
