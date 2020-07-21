import React from "react";
import * as Bootstrap from "react-bootstrap"



const darky = "bg-secondary";
const lighty = "bg-info";
const white = "whiteText";
const dark = "darkText";
class User extends React.Component {


    render() {
        let pannelColor = this.props.darkTheme ? darky : lighty;
        let textColor = !this.props.darkTheme ? dark : white;
        return (<h1 className={textColor + " title"} >
            {this.props.title}
        </h1>);
    }
}


export default User