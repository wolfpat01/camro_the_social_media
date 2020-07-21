import React from "react"
import * as Bootstrap from 'react-bootstrap';
import "../css/darkMod.css"

const darky = "pannelDark";
const lighty = "light";
const white = "whiteText";
const dark = "darkText";

class Menu extends React.Component {

  render() {

    let pannelColor = this.props.darkTheme ? darky : lighty;
    let textColor = !this.props.darkTheme ? dark : white;
    return (
      <Bootstrap.Navbar expand="lg" className={pannelColor + " col-12 navbar navbar-default navbar-fixed-top"}>
        <Bootstrap.Navbar.Brand href="#home" className={textColor} >camro</Bootstrap.Navbar.Brand>
        <Bootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" className={textColor} />
        <Bootstrap.Navbar.Collapse id="basic-navbar-nav">
          <Bootstrap.Nav className={"mr-auto " + textColor} >
            <Bootstrap.Nav.Link href="#home" className={textColor} >Home</Bootstrap.Nav.Link>
            <Bootstrap.Nav.Link href="#link" className={textColor} >Link</Bootstrap.Nav.Link>
          </Bootstrap.Nav>

        </Bootstrap.Navbar.Collapse>
      </Bootstrap.Navbar>
    )
  }
}

export default Menu