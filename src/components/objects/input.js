import React from "react"
import "../../css/input.css"

function onChange(e, f) {
    try {
        f(e)
    } catch { }
}


function Input(props) {

    return (<React.Fragment>
        <div className="group">
            <input type={props.type || "text"} name={props.name} className="inputfeild" onChange={(e) => onChange(e, props.onChange)} required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{props.display}</label>
        </div>
    </React.Fragment>)
}


export default Input