import React from "react";
import * as Bootstrap from "react-bootstrap"



const darky = "bg-secondary";
const lighty = "bg-info";
const white = "whiteText";
const dark = "darkText";


export default function Title(props) {
    let pannelColor = props.darkTheme ? darky : lighty;
    let textColor = !props.darkTheme ? dark : white;
    return (<h1 className={textColor + " title"} >
        {props.title}
    </h1>);
}
