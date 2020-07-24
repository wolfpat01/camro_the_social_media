import React from "react"
import * as Bootstrap from 'react-bootstrap';
import "../css/darkMod.css"

import User from "./objects/user"

const darky = "pannelDark";
const lighty = "light";
const white = "whiteText";
const dark = "darkText";

class Menu extends React.Component {
  makeSure() {
    if (this.props.token) {
      return <div><User token={this.props.token} darkTheme={this.props.darkTheme}></User>logout</div>
    } else { return <p>loading..</p> }
  }
  render() {

    let pannelColor = this.props.darkTheme ? darky : lighty;
    let textColor = !this.props.darkTheme ? dark : white;
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
        {this.makeSure()}
      </Bootstrap.Navbar>
    )
  }
}

export default Menu