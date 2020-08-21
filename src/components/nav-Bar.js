import React from "react"
import * as Bootstrap from 'react-bootstrap';
import "../css/darkMod.css"

import User from "./objects/user"

const darky = "pannelDark";
const lighty = "light";
const white = "whiteText";
const dark = "darkText";

function makeSureUserExists(props) {
  if (props.token) {
    return <div><User token={props.token} darkTheme={props.darkTheme} additionalCalsses="username"></User>logout</div>
  } else { return <p>loading..</p> }
}


function Menu(props) {
  let pannelColor = props.darkTheme ? darky : lighty;
  let textColor = !props.darkTheme ? dark : white;
  return (
    <Bootstrap.Navbar expand="lg" className={pannelColor + " col-12 navbar navbar-default navbar-fixed-top"}>
      <Bootstrap.Navbar.Brand href="#home" className={textColor} >camro</Bootstrap.Navbar.Brand>
      <Bootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" className={textColor} />
      <Bootstrap.Navbar.Collapse id="basic-navbar-nav">
        <Bootstrap.Nav className={"mr-auto " + textColor} >
          <Bootstrap.Nav.Link href="/" className={textColor} >Home</Bootstrap.Nav.Link>
          <Bootstrap.Nav.Link href="/login" className={textColor} >login</Bootstrap.Nav.Link>
        </Bootstrap.Nav>

      </Bootstrap.Navbar.Collapse>
      {makeSureUserExists(props)}
    </Bootstrap.Navbar>
  )
}



export default Menu